import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/general/footer';

export default function Search() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const requestRef = useRef(0);

    const handleScroll = () => {
        setScrollPosition(window.pageYOffset);
    };

    useEffect(() => {
        const handleAnimationFrame = () => {
            setScrollPosition(window.pageYOffset);
            requestRef.current = requestAnimationFrame(handleAnimationFrame);
        };

        requestRef.current = requestAnimationFrame(handleAnimationFrame);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="subContainer">
                    <div className="logoContainerSmall" style={{ zIndex: "1", cursor: "pointer" }} onClick={() => window.location.href = '/'}>
                        <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, ${scrollPosition ? `${scrollPosition}px` : '0'})`,
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}>
                        buscar arquitectos
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, 35vh)',
                        fontSize: '20px',
                        cursor: 'pointer',
                        width: 'max-content',
                    }}>
                        ver todos los arquitectos
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', transform: "translateY(50px)", zIndex: 1 }}>
                <Footer />
            </div>
            <div className="background-container">
                <div className="background-image" style={{ transform: `translateY(${-scrollPosition}px)` }}></div>
            </div>
        </div>
    );
}
