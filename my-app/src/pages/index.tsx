import React, { useState, useEffect } from 'react';
import Footer from '../components/general/footer';
import { useUser } from '@clerk/nextjs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { faUserPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SignOutButton } from '@clerk/clerk-react';

export default function Home() {
    const { user } = useUser();
    const [element, setElement] = useState<React.ReactNode>(null);
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
                setElement(
                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                        <DropdownMenu.Item className="DropdownMenuItem">
                            <SignOutButton>
                                <button style={{display: "flex"}}>
                                    Cerrar Sesión <div className="RightSlot"><FontAwesomeIcon icon={faRightToBracket}/></div>
                                </button>
                            </SignOutButton>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="DropdownMenuItem" onClick={() => window.location.href = "/edit"}>
                            Editar Perfil <div className="RightSlot"><FontAwesomeIcon icon={faUserPlus}/></div>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                );
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
            } else {
                setElement(
                    <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                        <DropdownMenu.Item className="DropdownMenuItem" onClick={() => window.location.href = "/sign_in"}>
                            Iniciar Sesión <div className="RightSlot"><FontAwesomeIcon icon={faRightToBracket}/></div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="DropdownMenuItem" onClick={() => window.location.href = "/sign_up"}>
                            Crear Perfil <div className="RightSlot"><FontAwesomeIcon icon={faUserPlus}/></div>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                );
                setButtonByUserType(
                    <button className='mainButton'
                        onClick={() => window.location.href = "/sign_up"}
                    >
                        <h1 className="title">crear perfil de</h1>
                        <h1 className="title">arquitectura</h1>
                    </button>
                );
            }
        };

        fetchUser();
    }, [user]);

    return (
        <div>
            <div style={{position: 'relative'}}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="IconButton" aria-label="Customise options">
                            <img src="/SILLA_TABLE.png" alt="Logo" className="centeredImage" style={{position: "absolute", bottom: "3px"}}/>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        {element}
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
                <div className="container">
                    <div className="subContainer">
                        <div className="logoContainer">
                            <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
                        </div>
                        <h1 className="title">tu mesa de proyectos</h1>
                        <div className="tableLogoContainer">
                            <img src="/LOGO_TABLE.png" alt="Logo" className="centeredImage"/>
                        </div>
                        {buttonByUserType}
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>
                <Footer />
            </div>
        </div>
    );
}
