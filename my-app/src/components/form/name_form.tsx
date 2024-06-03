import React from "react";

export default function NameForm({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {

    const [name, setName] = React.useState("");

    const handleNext = async () => {
        const response = await fetch(`/api/architect`);
        const architects = await response.json();

        const architectExists = architects.find((architect: any) => architect.name === name);

        if (architectExists) {
            alert("El nombre ya está en uso");
        }
        else if (name === "") {
            alert("Ingresa un nombre");
        }
        else {
            onNext();
        }
    }

    return (
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>nombre de su práctica de</h1>
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>arquitectura</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8vh"}}>
                <input style={{ 
                    justifyContent: "center",
                    textAlign: "center",
                    borderBottom: "2px solid black",
                    outline: "none"
                    
                }} 
                type="text" 
                placeholder="DLV Arquitectos"
                id="nombre"
                onChange= {e => setName(e.target.value)}   />
            </div>
            <div className="buttonContainer">
                <button onClick={onBack}>Volver</button>
                <button onClick={handleNext}>Siguiente</button>
            </div>

        </div>
    );
}