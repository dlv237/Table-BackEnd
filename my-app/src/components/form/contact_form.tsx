import React from "react";

export default function ContactForm({ onNext, onBack, telefono, setPhone, 
    address, setAddress, website, setWebsite, socialMedia, setSocialMedia }: 
    { onNext: () => void, onBack: () => void, 
        telefono: string, setPhone: (telefono: string) => void,
         address: string, setAddress: (address: string) => void, 
         website: string, setWebsite: (website: string) => void, 
         socialMedia: string, setSocialMedia: (socialMedia: string) => void}) {

    const handleNext = () => {
        if (telefono === "" || address === "") {
            alert("Por favor, ingresa al menos un metodo de contacto");
        } else {
            onNext();
        }
    }

    return (
        <div className="formContainer">
            <h1 style={{fontSize: "2.5vh", fontWeight: "bold"}}>¿cómo te pueden contactar?</h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5vh", flexDirection: "column", alignItems: "center"}}>
                <input style={{ marginTop: "1.5vh"}} type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setPhone(e.target.value)}/>
                <input style={{ marginTop: "1.5vh"}} type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)}/>
                <input style={{ marginTop: "1.5vh"}} type="text" placeholder="Sitio web" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <input style={{ marginTop: "1.5vh"}} type="text" placeholder="Redes sociales" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)}/>
            </div>
            <div className="buttonContainer">
                <button onClick={onBack}>Volver</button>
                <button onClick={handleNext}>Crear Cuenta</button>
            </div>
        </div>
    );
}
