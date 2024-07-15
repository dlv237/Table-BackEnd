import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/cards/search_card";
import Footer from "@/components/general/footer";

export default function Architects() {
    const [architectsData, setArchitectsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultsLabel, setResultsLabel] = useState("Resultados de búsqueda" as string);

    const shuffleArray = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const loader = (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div className="loader"></div>
        </div>
    );

    useEffect(() => {
        const fetchArchitects = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const scale = urlParams.get("scale") || "";
            const region = urlParams.get("region") || "Todas las regiones";

            console.log(scale, region);

            let architectsResponse = await fetch("/api/architect");
            let architectsData = await architectsResponse.json();

            if (region !== "Todas las regiones") {
                architectsData = architectsData.filter((architect: any) => architect.city === region);
            }
            
            if (scale !== "") {
                const intScale = parseInt(scale);
                architectsData = await Promise.all(architectsData.map(async (architect: any) => {
                    const response = await fetch(`/api/architect/${architect.id}/scale`);
                    const scalesData = await response.json();
                    console.log(scalesData);

                    const hasScale = scalesData.some((scale: any) => scale.scale_id === intScale);
                    return hasScale ? architect : null;
                }));
                architectsData = architectsData.filter((architect: null) => architect !== null);
            }
            
            setArchitectsData(shuffleArray(architectsData));
            setIsLoading(false);
            if (architectsData.length === 0) {
                setResultsLabel("No se encontraron arquitectos con estos criterios de búsqueda");
            }
        };

        fetchArchitects();
    }, []);

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="logoContainerSmall" style={{marginBottom: "4vh", cursor: "pointer"}} onClick={ () => window.location.href = "/"}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                </div>
            </div>
            <h1 className="title" style={{marginTop: "3vh", marginBottom: "3vh", textAlign: "center", fontSize: "medium"}}>{resultsLabel}</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="newSearchButton">
                    <button style={{}} onClick={() => window.location.href = "/search"}>Realizar otra búsqueda</button>
                </div>
            </div>
            <div className="cardsContainer">
                {isLoading ? loader :
                <div className="grid-container">
                    {architectsData.map((architect: any) => (
                        <ProfileCard architect={architect} key={architect.id} />
                    ))}
                </div>}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', marginTop: '7vh'}}>
                <Footer />
            </div>
        </div>
    );
}