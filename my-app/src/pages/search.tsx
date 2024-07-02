import React, { useEffect, useState } from 'react';
import Footer from '../components/general/footer';
import TypeView from '@/components/search/type_view';
import ScaleSelector from '@/components/search/scale_selector';

export default function Search() {
    const [isWide, setIsWide] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(0);
    // Estado para controlar qué componente mostrar
    const [showScaleSelector, setShowScaleSelector] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsWide(window.innerWidth > 1020);
                setAvailableHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Funciones para manejar los clics
    const handleSearchArchitectsClick = () => {
        setShowScaleSelector(true); // Muestra ScaleSelector
    };

    const handleViewAllArchitectsClick = () => {
        window.location.href = "/architects"; // Redirige a /architects
    };

    return (
        <div className='container' style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(/LOGO_TABLE_ROTADO_ST.png)`, 
            height: `${availableHeight}px`,
            backgroundSize: isWide ? "contain" : "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="subContainer">
                <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                {/* Renderiza condicionalmente TypeView o ScaleSelector */}
                {showScaleSelector ? 
                    <ScaleSelector availableHeight={availableHeight} /> : 
                    <TypeView availableHeight={availableHeight} onSearchArchitectsClick={handleSearchArchitectsClick} onViewAllArchitectsClick={handleViewAllArchitectsClick} />
                }
            </div>
            <Footer />
        </div>
    );
}