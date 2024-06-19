import React from "react";
import Footer from "../components/general/footer";
import { SignIn } from "@clerk/nextjs";

export default function IniciarSesion() {

    return (
        <div>
            <div className="container">
                <div className="logoContainerSmall" style={{marginBottom: "4vh"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                </div>
                <SignIn routing="hash" fallbackRedirectUrl={"/"}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', marginTop: '7vh'}}>
                <Footer />
            </div>
        </div>
    );
}