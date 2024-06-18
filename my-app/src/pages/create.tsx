import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/general/footer";
import NameForm from "../components/form/name_form";
import CityForm from "../components/form/city_form";
import ExperienceForm from "../components/form/experience_form";
import ScaleForm from "../components/form/scale_form";
import ContactForm from "../components/form/contact_form";
import FileForm from "../components/form/file_form";
import { useUser } from "@clerk/nextjs";

export default function Create() {

    type SocialMedia = { type: string; handle: string };
    type FileData = {
        url: string;
        name: string;
    };

    const [step, setStep] = useState(0);
    const [architectName, setName] = useState("");
    const [cityName, setCity] = useState("Selecciona una region");
    const [selectedExperience, setExperience] = useState("");
    const [selectedScales, setScales] = useState<string[]>([]);
    const [telefono, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fileFormRef = useRef<{ uploadFiles: () => Promise<FileData[]> }>(null);

    const { user } = useUser();

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
            setSelectedFiles(savedData.selectedFiles || []);
        }
    }, []);

    const handleSignUpAttempt = async () => {
        const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
        if (user && savedData && savedData.telefono != "") {
            const dataArchitect = {
                email: user.emailAddresses[0].emailAddress,
                phone: savedData.telefono,
                name: savedData.architectName,
                city: savedData.cityName,
                experience_id: parseInt(savedData.selectedExperience),
                website: savedData.website,
                address: savedData.address,
            };
            console.log(dataArchitect);
            const response = await fetch('/api/architect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataArchitect),
            });

            if (!response.ok) {
                alert("Error al crear el perfil");
                console.log(response.body);
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
            }
            console.log(savedData.socialMedia);
            console.log(savedData.socialMedia.length);
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

            for (const file of savedData.selectedFiles) {
                const dataFile = {
                    name: file.name,
                };

                await fetch(`/api/architect/${architect.id}/image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataFile),
                });
            }

            localStorage.removeItem("formData");
            window.location.href = "/";
        }
    };

    useEffect(() => {
        if (step === 6) {
            handleSignUpAttempt();
        }
    }, [step, user]);

    const handleNext = async () => {

        const updatedData = {
            architectName,
            cityName,
            selectedExperience,
            selectedScales,
            telefono,
            address,
            website,
            socialMedia,
            selectedOptions,
            selectedFiles,
        };
        
        localStorage.setItem("formData", JSON.stringify(updatedData));


        let isNameInUse = false;

        if (step === 0 && architectName.trim() === "") {
            alert("Por favor, ingresa un nombre");
            return;
        } else {
            await fetch('api/architect')
                .then(response => response.json())
                .then(data => {
                    isNameInUse = data.some((architect: { name: string }) => architect.name === architectName);
                })
                .catch(error => console.error('Error:', error));
        }
        if (isNameInUse) {
            alert("El nombre del arquitecto ya está en uso");
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

        let isPhoneInUse = false;
        if (step === 4 && telefono.trim() === "") {
            alert("Por favor, ingresa un telefono");
            return;
        } else {
            await fetch('api/architect')
                .then(response => response.json())
                .then(data => {
                    isPhoneInUse = data.some((architect: { phone: string }) => architect.phone === telefono) as boolean
                })
                .catch(error => console.error('Error:', error));
        }

        if (isPhoneInUse) {
            alert("El telefono ya está en uso");
            return;
        }

        if (step === 5) {
            if (fileFormRef.current) {
                setIsLoading(true);
                const uploadedFiles = await fileFormRef.current.uploadFiles();
                setSelectedFiles(uploadedFiles);
                setIsLoading(false);
            }
        }
        const savedData = JSON.parse(localStorage.getItem("formData") || "{}");

        proceedToNextStep();
    };

    const proceedToNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    let form;
    const loader = (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div className="loader"></div>
            <h1 style={{ fontSize: "2.5vh"}}>Estamos creando tu</h1>
            <h1 style={{ fontSize: "2.5vh"}}>portafolios</h1>
        </div>
    );
    let button = (
        <div className="buttonContainer">
            <button onClick={handleBack}>Volver</button>
            <button onClick={handleNext}>Siguiente</button>
        </div>
    );
    let logoClass = "logoContainer";

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
            form = <ContactForm 
                onNext={handleNext} 
                onBack={handleBack}
                telefono={telefono} 
                setPhone={setPhone}
                address={address} 
                setAddress={setAddress}
                website={website} 
                setWebsite={setWebsite}
                socialMedia={socialMedia} 
                setSocialMedia={setSocialMedia}
                selectedOptions={selectedOptions} 
                setSelectedOptions={setSelectedOptions}
            />;
            break;
        case 5:
            logoClass = "logoContainerSmall";
            form = <FileForm ref={fileFormRef} onNext={handleNext} onBack={handleBack} />;
            button = (
                <div className="buttonContainer">
                    <button onClick={handleBack}>Volver</button>
                    <button onClick={handleNext}>Crear Perfil</button>
                </div>
            );
            break;
        case 6:
            form = (
                <div className="formContainer">
                    <h1 style={{ fontSize: "2.5vh", fontWeight: "bold" }}>¡Gracias por registrarte!</h1>
                    <h1 style={{ fontSize: "2.5vh", fontWeight: "bold" }}>Tu portafolio ha sido creado con éxito</h1>
                </div>
            );
            button = <div></div>;
            const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
            console.log(savedData.selectedFiles);
            console.log(savedData);

            break;
    }

    return (
        <div>
            <div className="container">
                <div className={logoClass} onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                {isLoading ? loader : form}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>
                {isLoading ? <></> : button}
                <Footer />
            </div>
        </div>
    );
}
