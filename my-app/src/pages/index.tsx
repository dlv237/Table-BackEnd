import React from 'react';

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '50%', marginTop: '20vh' }}>
                <img src="/LOGO_TEXTO.png" alt="Logo" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
            </div>
            <h1 style={{ fontSize: '4.8vw', marginTop: '1vh'}}>tu mesa de proyectos</h1>
            <div style={{ maxWidth: '55%', marginTop: '7vh' }}>
                <img src="/LOGO_TABLE.png" alt="Logo" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
            </div>
            <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '50%', marginTop: '10vh', marginBottom: '20vh'}}>
                <h1 style={{ fontSize: '4.8vw' }}>crear perfil de</h1>
                <h1 style={{ fontSize: '4.8vw' }}>arquitectura</h1>
            </div>
        </div>
    );
}