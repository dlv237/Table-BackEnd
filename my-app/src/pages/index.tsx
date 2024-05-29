import React from 'react';
import Footer from '../components/general/footer';
export default function Home() {
    return (
        <div className="container">
            <div className="logoContainer">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <div className="tableLogoContainer">
                <img src="/LOGO_TABLE.png" alt="Logo" className="centeredImage"/>
            </div>
            <div className="profileContainer">
                <h1 className="title">crear perfil de</h1>
                <h1 className="title">arquitectura</h1>
            </div>
            <Footer />
        </div>
    );
}