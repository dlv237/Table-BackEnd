import React, { useState, useEffect } from 'react';
import Footer from '../components/general/footer';
import { useUser } from '@clerk/nextjs';

export default function Home() {
    const { user } = useUser();
    const [buttonByUserType, setButtonByUserType] = useState(
        <button 
            className='mainButton'
            onClick={() => window.location.href = "/sign_up"}
        >
            <h1 className="title">crear perfil de</h1>
            <h1 className="title">arquitectura</h1>
        </button>
    );

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                const response = await fetch('/api/architect');
                const architects = await response.json();
                const userHasProfile = architects.find((architect: any) => architect.email === user.emailAddresses[0].emailAddress);
                console.log(userHasProfile);

                if (userHasProfile) {
                    setButtonByUserType(
                        <button className='mainButton'
                            onClick={() => window.location.href = "/edit"}
                        >
                            <h1 className="title">editar perfil de</h1>
                            <h1 className="title">arquitectura</h1>
                        </button>
                    );
                } else {
                    setButtonByUserType(
                        <button className='mainButton'
                            onClick={() => window.location.href = "/create"}
                        >
                            <h1 className="title">crear perfil de</h1>
                            <h1 className="title">arquitectura</h1>
                        </button>
                    );
                }
            }
        };

        fetchUser();
    }, [user]);

    return (
        <div className="container">
            <div className="logoContainer">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <div className="tableLogoContainer">
                <img src="/LOGO_TABLE.png" alt="Logo" className="centeredImage"/>
            </div>
            {buttonByUserType}
            <Footer />
        </div>
    );
}