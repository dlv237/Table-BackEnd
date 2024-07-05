import React from "react";
import Footer from "../components/general/footer";
import { SignUp } from "@clerk/nextjs";

export default function CrearCuenta() {

    return (
        <div>
            <div className="container">
                <div className="logoContainerSmall" style={{marginBottom: "4vh", cursor: "pointer"}} onClick={ () => window.location.href = "/"}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                </div>
                <SignUp routing="hash" fallbackRedirectUrl={"/create"}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', marginTop: '7vh'}}>
                <Footer />
            </div>
        </div>
    );
}