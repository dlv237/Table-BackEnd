import React, {useEffect, useState} from 'react';
import Footer from '../components/general/footer';

export default function Search() {
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
                <div className="background-image"></div>
            </div>

        </div>
    );
}

