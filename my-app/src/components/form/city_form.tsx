import React from "react";

export default function CityForm({ onNext, onBack, cityName, setName}: 
    { onNext: () => void, onBack: () => void, cityName: string, setName: (name: string) => void}) {

    const handleNext = async () => {
        if (!cityDict.includes(cityName) && cityName == "Selecciona una region") {
            alert("Selecciona una region");
        }
        else {
            onNext();
        }
    }

    const cityDict = [
        "Selecciona una region",
        "RM - Metropolitana de Santiago",
        "I - Tarapacá",
        "II - Antofagasta",
        "III - Atacama",
        "IV - Coquimbo",
        "V - Valparaíso",
        "VI - Libertador General Bernardo O'Higgins",
        "VII - Maule",
        "VIII - Biobío",
        "IX - La Araucanía",
        "X - Los Lagos",
        "XI - Aisén del G. Carlos Ibáñez del Campo",
        "XII - Magallanes y de la Antártica Chilena",
        "XIV - Los Ríos",
        "XV - Arica y Parinacota",
        "XVI - Ñuble",
    ];

    return (
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>¿dónde se encuentran?</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8vh"}}>
            <select 
                value={cityName} 
                onChange={e => setName(e.target.value)}
                className="selectOption"
                style={{background: "none"}}
            >
                {cityDict.map(city => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            </div>
        </div>
        
    );
}
