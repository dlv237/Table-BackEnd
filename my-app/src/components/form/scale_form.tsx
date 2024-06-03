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
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5vh", flexDirection: "column", alignItems: "center"}}>
                <label style={{ margin: "2vh 0", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/>Pequeña
                </label>
                <label style={{ margin: "2vh 0", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/>Media Baja
                </label>
                <label style={{ margin: "2vh 0", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/>Media
                </label>
                <label style={{ margin: "2vh 0", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/>Media Alta
                </label>
                <label style={{ margin: "2vh 0", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/>Gran
                </label>
            </div>
            <div className="buttonContainer">
                <button onClick={onBack}>Volver</button>
                <button onClick={handleNext}>Siguiente</button>
            </div>
        </div>
    );
}