import React from 'react';
import Footer from '../components/general/footer';

export default function Search(){
    return (
        <div>
            <div style={{position: 'relative'}}>
                <div className="container">
                    <div className="subContainer">
                        <div className="logoContainerSmall" style={{zIndex: "1", cursor: "pointer"}} onClick={() => window.location.href = '/'}>
                            <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
                        </div>
                        <div className="tableLogoContainer">
                            <img src="/LOGO_TABLE.png" alt="Logo" className="centeredImage" style={{opacity: "30%", transform: "rotate(90deg) scale(3.5)", marginTop: "75px"}}/>
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
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', transform: "translateY(50px)"}}>
                <Footer/>
            </div>
        </div>
    )
}

