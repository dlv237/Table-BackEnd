import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/cards/search_card";
import Footer from "@/components/general/footer";

export default function Architects() {
    const [architectsData, setArchitectsData] = useState<any[]>([]);

    const shuffleArray = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

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
        };

        fetchArchitects();
    }, []);

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="logoContainerSmall" style={{marginBottom: "4vh"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                </div>
            </div>
            <div className="cardsContainer">
                <div className="grid-container">
                    {architectsData.map((architect: any) => (
                        <ProfileCard architect={architect} key={architect.id} />
                    ))}
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', marginTop: '7vh'}}>
                <Footer />
            </div>
        </div>
    );
}