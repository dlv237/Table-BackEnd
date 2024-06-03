import React from "react";

export default function ExperienceForm({ onNext, onBack, selectedExperience, setExperience }: 
    { onNext: () => void, onBack: () => void, selectedExperience: string, setExperience: (selectedExperience: string) => void}) {

    const handleNext = () => {
        if (selectedExperience === "") {
            alert("Por favor, selecciona una experiencia");
        } else {
            onNext();
        }
    }

    return (
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>¿cuánto tiempo tiene</h1>
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>su práctica?</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5vh", flexDirection: "column", alignItems: "center"}}>
                <label style={{ margin: "2vh 0", color: selectedExperience === '1' ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="radio" name="experience" value="1" style={{ display: 'none' }} onChange={() => setExperience('1')}/>Estamos empezando!
                </label>
                <label style={{ margin: "2vh 0", color: selectedExperience === '2' ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="radio" name="experience" value="2" style={{ display: 'none' }} onChange={() => setExperience('2')}/>Entre 1 y 5 años
                </label>
                <label style={{ margin: "2vh 0", color: selectedExperience === '3' ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="radio" name="experience" value="3" style={{ display: 'none' }} onChange={() => setExperience('3')}/>Entre 5 y 10 años
                </label>
                <label style={{ margin: "2vh 0", color: selectedExperience === '4' ? 'black' : 'gray', transition: 'color 0.5s' }}>
                    <input type="radio" name="experience" value="4" style={{ display: 'none' }} onChange={() => setExperience('4')}/>Más de 10 años
                </label>
            </div>
            <div className="buttonContainer">
                <button onClick={onBack}>Volver</button>
                <button onClick={handleNext}>Siguiente</button>
            </div>
        </div>
    );
}