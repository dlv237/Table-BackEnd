import React, { use } from 'react';
import Footer from '../components/general/footer';
import { useUser } from '@clerk/nextjs';

export default function Home() {
    const { user } = useUser();
    let buttonByUserType =  <button 
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    font: 'inherit',
                                    cursor: 'pointer',
                                    outline: 'inherit'
                                }}
                                onClick={() => window.location.href = "/create"}
                                                                                >
                                <h1 className="title">crear perfil de</h1>
                                <h1 className="title">arquitectura</h1>
                            </button>

    if (user) {
        buttonByUserType = <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    font: 'inherit',
                                    cursor: 'pointer',
                                    outline: 'inherit'
                                }}
                                onClick={() => window.location.href = "/edit"}
                            >
                                <h1 className="title">editar perfil de</h1>
                                <h1 className="title">arquitectura</h1>
                            </button>
                            
        
    }

    return (
        <div className="container">
            <div className="logoContainer">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <div className="tableLogoContainer">
                <img src="/LOGO_TABLE.png" alt="Logo" className="centeredImage"/>
            </div>
            {buttonByUserType}
            <Footer />
        </div>
    );
}