import React, { useEffect, useState } from 'react';
import Footer from '../components/general/footer';

export default function Search() {
    const [isWide, setIsWide] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsWide(window.innerWidth > 1020);
                setAvailableHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            handleResize(); // Llamar una vez para establecer el estado inicial

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className='container' 
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(/LOGO_TABLE_ROTADO_ST.png)`, 
                height: availableHeight, // Utiliza el estado para la altura
                backgroundSize: isWide ? "contain" : "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}>
            <div className="subContainer">
                <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                    <h1 style = {{position: "absolute", top: availableHeight * 0.8, fontSize: "x-large"}}>buscar arquitectos</h1>
                    <h1 style = {{position: "absolute", top: availableHeight * 0.15, fontSize: "x-large"}}>ver todos los arquitectos</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}
