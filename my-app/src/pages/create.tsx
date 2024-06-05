import React, { useEffect, useState } from "react";
import Footer from "../components/general/footer";
import NameForm from "../components/form/name_form";
import CityForm from "../components/form/city_form";
import ExperienceForm from "../components/form/experience_form";
import ScaleForm from "../components/form/scale_form";
import ContactForm from "../components/form/contact_form";
import { useUser } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/clerk-react";

export default function Create() {

    const [step, setStep] = useState(0);
    const [architectName, setName] = useState("");
    const [cityName, setCity] = useState("Selecciona una region");
    const [selectedExperience, setExperience] = useState("");
    const [selectedScales, setScales] = useState<string[]>([]);
    const [telefono, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
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
            setSocialMedia(savedData.socialMedia || "");
        }

        const handleSignUpAttempt = async () => {
            if (user && savedData) {
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

                const architect = await response.json();

                savedData.selectedScales.forEach(async (scale: string) => {
                    const dataScale = {
                        architect_id: architect.id,
                        scale_id: parseInt(scale),
                    };

                    await fetch('/api/scales', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataScale),
                    });
                });

                localStorage.removeItem("formData");
                window.location.href = "/";
            }
        };

        handleSignUpAttempt();
    }, [user]);

    const handleNext = () => {
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
        };
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    let form;
    let logoClass = "logoContainer"
    let textClass = "title"
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
                socialMedia={socialMedia} setSocialMedia={setSocialMedia} />;
            break;

        case 5:
            form = <SignUp routing="hash" />;
            logoClass = "logoContainerSmall"
            textClass = "subtitle"
            break;
    }


    return (
        <div className="container">
            <div className={logoClass}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <h1 className={textClass}>tu mesa de proyectos</h1>
            {form}
            <Footer />
        </div>
    );
}
