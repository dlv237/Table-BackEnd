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
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>¿qué tipos de proyecto </h1>
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>ha desarrollado su práctica?</h1>
            <div className='experiencesContainer'>
            <div className="experienceOption">
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/>Tipo 1
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 1 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}>
                    <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/>Tipo 2
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 2 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/>Tipo 3
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 3 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/>Tipo 4
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 4 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/>Tipo 5
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 5 </h1>
                </label>
            </div>
            <div className="experienceOption">
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('6') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="6" style={{ display: 'none' }} onChange={() => handleScaleChange('6')}/>Tipo 6
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 6 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('7') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}>
                    <input type="checkbox" name="experience" value="7" style={{ display: 'none' }} onChange={() => handleScaleChange('7')}/>Tipo 7
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 7 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('8') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="8" style={{ display: 'none' }} onChange={() => handleScaleChange('8')}/>Tipo 8
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 8 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('9') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="9" style={{ display: 'none' }} onChange={() => handleScaleChange('9')}/>Tipo 9
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 9 </h1>
                </label>
                <label style={{ margin: "2vh 0", flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('10') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="10" style={{ display: 'none' }} onChange={() => handleScaleChange('10')}/>Tipo 10
                    <h1 style={{fontSize: "1.6vh"}}>Detalle del tipo 10 </h1>
                </label>
            </div>
            </div>
            
        </div>
    );
}