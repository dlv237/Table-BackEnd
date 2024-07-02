import React from 'react';


type RegionSelectorProps = {
    availableHeight: number;
    onSearch: () => void;
    onBack: () => void;
    setSelectedRegion: (region: string) => void;
};

export default function RegionSelector({ availableHeight, onSearch, onBack, setSelectedRegion }: RegionSelectorProps) {

    const cityDict = [
        "Todas las regiones",
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
            <h1 style={{fontSize: "2.5vh"}}>¿buscas arquitectos ubicados en</h1>
            <h1 style={{fontSize: "2.5vh"}}>algún lugar en particular?</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8vh"}}>
            <select  
                onChange={e => setSelectedRegion(e.target.value)}
                className="selectOption"
            >
                {cityDict.map(city => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            </div>
            <div className="buttonContainer" style={{top: `${availableHeight * 0.8}px`}}>
                <button onClick={() => onBack()}>Volver</button>
                <button onClick={() => onSearch()}>Buscar</button>
            </div>
        </div>
    );
}