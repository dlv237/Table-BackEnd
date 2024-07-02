import React, { useEffect, useState } from 'react';
import Footer from '../components/general/footer';

export default function Search() {
    // Initialize isWide with a default value (false) or a more appropriate initial state for your use case
    const [isWide, setIsWide] = useState(false);

    useEffect(() => {
        // Check if window is defined (this is for SSR/SSG compatibility)
        if (typeof window !== "undefined") {
            // Set the initial state based on window.innerWidth
            setIsWide(window.innerWidth > 1020);

            const handleResize = () => {
                setIsWide(window.innerWidth > 1020);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className='container' 
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/LOGO_TABLE_ROTADO_ST.png)`, 
                height: "100vh",
                backgroundSize: isWide ? "contain" : "cover", // Changes between 'contain' and 'cover' based on width
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}>
            <div className="subContainer">
                <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                    <h1 style = {{position: "absolute", top: "50%", transform: "translateY(30vh)", fontSize: "x-large"}}>buscar arquitectos</h1>
                    <h1 style = {{position: "absolute", top: "50%", transform: "translateY(-35vh)", fontSize: "x-large"}}>ver todos los arquitectos</h1>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}