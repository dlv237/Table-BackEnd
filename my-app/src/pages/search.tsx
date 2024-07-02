import React, { useEffect, useState } from 'react';
import Footer from '../components/general/footer';

export default function Search() {
    // Initialize isWide with a default value (false) or a more appropriate initial state for your use case
    const [isWide, setIsWide] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        // Check if window is defined (this is for SSR/SSG compatibility)
        if (typeof window !== "undefined") {
            // Set the initial state based on window.innerWidth
            setIsWide(window.innerWidth > 1020);
            setWindowHeight(window.innerHeight);

            const handleResize = () => {
                setIsWide(window.innerWidth > 1020);
                setWindowHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener on component unmount
            
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    const topPositionBuscar = windowHeight / 2 + 0.3*windowHeight; // Ajusta estos valores según sea necesario
    const topPositionVerTodos = windowHeight / 2 - 0.35*windowHeight; // Ajusta estos valores según sea necesario

    return (
        <div className='container' 
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(/LOGO_TABLE_ROTADO_ST.png)`, 
                height: "100vh",
                backgroundSize: isWide ? "contain" : "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}>
            <div className="subContainer">
                <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <h1 style={{position: "absolute", top: `${topPositionBuscar}px`, fontSize: "x-large"}}>buscar arquitectos</h1>
                <h1 style={{position: "absolute", top: `${topPositionVerTodos}px`, fontSize: "x-large"}}>ver todos los arquitectos</h1>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}