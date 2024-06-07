import React from "react";

export default function ScaleForm({ onNext, onBack, selectedScales, setScales }: 
    { onNext: () => void, onBack: () => void, selectedScales: string[], setScales: (selectedScales: string[]) => void}) {

    const handleNext = () => {
        if (selectedScales.length === 0) {
            alert("Por favor, selecciona al menos una escala");
        } else {
            onNext();
        }
    }

    const handleScaleChange = (scale: string) => {
        if (selectedScales.includes(scale)) {
            setScales(selectedScales.filter(s => s !== scale));
        } else {
            setScales([...selectedScales, scale]);
        }
    }

    return (
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>¿qué escalas de proyecto </h1>
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>ha desarrollado su práctica?</h1>
            <div className="experienceOption">
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/>Pequeña
                    <h1 style={{fontSize: "1.25vh"}}>ampliaciones/remodelaciones de casas, quinchos, terrazas, cocinas, etc </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/>Media Baja
                    <h1 style={{fontSize: "1.25vh"}}>casas, refugios, remodelaciones de oficinas, locales comerciales, etc </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/>Media
                    <h1 style={{fontSize: "1.25vh"}}>conjuntos de casas, edificios pequeños, centros médicos, etc </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/>Media Alta
                    <h1 style={{fontSize: "1.25vh"}}>edificios, clínicas/hospitales, universidades, centros comerciales, etc </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/>Gran
                    <h1 style={{fontSize: "1.25vh"}}>conjuntos de viviendas, parques industriales, planes maestros, etc </h1>
                </label>
            </div>
        </div>
    );
}