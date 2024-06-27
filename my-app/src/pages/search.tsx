import React, {useEffect, useState} from 'react';
import Footer from '../components/general/footer';

export default function Search() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowY: "hidden" }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="subContainer">
                    <div className="logoContainerSmall" style={{ zIndex: "1", cursor: "pointer" }} onClick={() => window.location.href = '/'}>
                        <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -30vh)',
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
                <div className="background-image" style={{ backgroundPositionY: `${-scrollPosition}px` }}></div>
            </div>

        </div>
    );
}

