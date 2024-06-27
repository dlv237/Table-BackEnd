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
                </div>
            </div>
            <div className="background-container">
                <div className="background-image" style={{ backgroundPositionY: `${-scrollPosition}px` }}></div>
            </div>

        </div>
    );
}

