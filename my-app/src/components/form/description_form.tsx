import React, { useState } from "react";

export default function DescriptionForm({
    description,
    setDescription,}: 
    { onNext: () => void, onBack: () => void, description: string, setDescription: (description: string) => void}) {

    return(
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>Ingresa una breve descripción</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8vh"}}>
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    className="descriptionInput"
                    placeholder="puedes ingresar hasta 400 caracteres"
                    maxLength={400}
                    style={{height: "15rem", width: "15rem", textAlign: "center", background: "none"}}
                />
            </div>
        </div>
    )
}