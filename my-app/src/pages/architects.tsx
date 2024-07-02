import React, { useEffect, useState } from "react";

export default function Architects() {
    const [architectsData, setArchitectsData] = useState<any[]>([]);

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
            
            setArchitectsData(architectsData);
        };

        fetchArchitects();
    }, []);

    return (
        <div>
            <h1>Architects</h1>
            <ul>
                {architectsData.map((architect) => (
                    <li key={architect.id}>{architect.name} - {architect.city}</li>
                ))}
            </ul>
        </div>
    );
}