import React from 'react';
import Footer from '@/components/general/footer';
import '@/app/about.css';

const About = () => (
    <div style={{position: 'relative'}}>
        <div className="container">
            <div className="logoContainer">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <div className="aboutUsContainer">
                "Aquí va la información sobre table (a actualizar), puede incluir fotos y cualquier información pertinente."
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>
            <Footer />
        </div>
    </div>
)

export default About;