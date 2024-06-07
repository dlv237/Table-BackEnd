import React, { useEffect, useState } from "react";
import Footer from "../components/general/footer";
import NameForm from "../components/form/name_form";
import CityForm from "../components/form/city_form";
import ExperienceForm from "../components/form/experience_form";
import ScaleForm from "../components/form/scale_form";
import ContactForm from "../components/form/contact_form";
import { useUser } from "@clerk/nextjs";

export default function Create() {

    type SocialMedia = { type: string; handle: string };

    const [step, setStep] = useState(0);
    const [architectName, setName] = useState("");
    const [cityName, setCity] = useState("Selecciona una region");
    const [selectedExperience, setExperience] = useState("");
    const [selectedScales, setScales] = useState<string[]>([]);
    const [telefono, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);;
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


    const { user } = useUser();

    const [caseValue, setCaseValue] = useState(0);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
        if (savedData) {
            setName(savedData.architectName || "");
            setCity(savedData.cityName || "Selecciona una region");
            setExperience(savedData.selectedExperience || "");
            setScales(savedData.selectedScales || []);
            setPhone(savedData.telefono || "");
            setAddress(savedData.address || "");
            setWebsite(savedData.website || "");
            setSocialMedia(savedData.socialMedia || []);
            setSelectedOptions(savedData.selectedOptions || []);
        }
    }, []);

    const handleSignUpAttempt = async () => {
        const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
        if (user && savedData && savedData.Phone != "") {
            const dataArchitect = {
                email: user.emailAddresses[0].emailAddress,
                phone: savedData.telefono,
                name: savedData.architectName,
                city: savedData.cityName,
                experience_id: parseInt(savedData.selectedExperience),
                website: savedData.website,
                address: savedData.address,
            };

            const response = await fetch('/api/architect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataArchitect),
            });

            if (!response.ok) {
                alert("Error al crear el perfil");
                return;
            }

            const responseJson = await response.json();
            const architect = responseJson.architect;

            for (const scale of savedData.selectedScales) {
                const dataScale = {
                    scale_id: parseInt(scale),
                };
                await fetch(`/api/architect/${architect.id}/scale`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataScale),
                });
                console.log("la escala quedo asi ", JSON.stringify(dataScale))
            }
            
            console.log("las redes quedaron asi ", JSON.stringify(savedData.socialMedia))
            console.log("las redes quedaron asi ", JSON.stringify(savedData.socialMedia))
            for (let i = 0; i < savedData.socialMedia.length; i++) {
                const dataNetwork = {
                    social_type: savedData.selectedOptions[i],
                    social_media: savedData.socialMedia[i],
                };

                await fetch(`/api/architect/${architect.id}/network`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataNetwork),
                });
            }
            localStorage.removeItem("formData");
            window.location.href = "/";
        }
    };

    useEffect(() => {
        if (step === 5) {
            handleSignUpAttempt();
        }
    }, [step, user]);

    const handleNext = () => {
        if (step === 0 && architectName.trim() === "") {
            alert("Por favor, ingresa un nombre");
            return;
        }

        if (step === 1 && cityName === "Selecciona una region") {
            alert("Por favor, selecciona una region");
            return;
        }

        if (step === 2 && selectedExperience === "") {
            alert("Por favor, selecciona una experiencia");
            return;
        }

        if (step === 3 && selectedScales.length === 0) {
            alert("Por favor, selecciona al menos una escala");
            return;
        }

        if (step === 4 && telefono.trim() === "") {
            alert("Por favor, ingresa un telefono");
            return;
        }
        
        setStep((prevStep) => prevStep + 1);

        const formData = {
            architectName,
            cityName,
            selectedExperience,
            selectedScales,
            telefono,
            address,
            website,
            socialMedia,
            selectedOptions
        };
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    let form;
    let button =    <div className="buttonContainer">
                        <button onClick={handleBack}>Volver</button>
                        <button onClick={handleNext}>Siguiente</button>
                    </div>;
    let logoClass = "logoContainer"
    switch (step) {
        case -1:
            window.location.href = "/";
            break;

        case 0:
            form = <NameForm onNext={handleNext} onBack={handleBack} name={architectName} setName={setName} />;

            break;

        case 1:
            form = <CityForm onNext={handleNext} onBack={handleBack} cityName={cityName} setName={setCity} />;
            break;

        case 2:
            form = <ExperienceForm onNext={handleNext} onBack={handleBack} selectedExperience={selectedExperience} setExperience={setExperience} />;
            break;

        case 3:
            form = <ScaleForm onNext={handleNext} onBack={handleBack} selectedScales={selectedScales} setScales={setScales} />;
            break;

            case 4:
                form = <ContactForm onNext={handleNext} onBack={handleBack}
                    telefono={telefono} setPhone={setPhone}
                    address={address} setAddress={setAddress}
                    website={website} setWebsite={setWebsite}
                    socialMedia={socialMedia} setSocialMedia={setSocialMedia}
                    selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
                    />;
                button =       <div className="buttonContainer">
                                    <button onClick={handleBack}>Volver</button>
                                    <button onClick={handleNext}>Crear Cuenta</button>
                                </div>
                break;
        
        case 5:
            form = <h1 className="title" style={{marginTop: "20vh"}}>Tu perfil ha sido creado con éxito</h1>
            break;
    }


    return (
        <div>
            <div className="container">
            <div className={logoClass} onClick={() => window.location.href = "/"}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
            </div>
                {form}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>
                {button}
                <Footer />
            </div>
        </div>
    );
}
