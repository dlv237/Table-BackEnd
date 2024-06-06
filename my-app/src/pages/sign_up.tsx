import React from "react";
import Footer from "../components/general/footer";
import { SignUp } from "@clerk/nextjs";

export default function CrearCuenta() {

    return (
        <div className="container">
            <div className="logoContainerSmall" style={{marginBottom: "4vh"}}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <SignUp routing="hash" fallbackRedirectUrl={"/create"}/>
            <Footer />
        </div>
    );
}