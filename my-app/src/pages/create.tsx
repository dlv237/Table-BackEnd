import React, { useState } from "react";
import Footer from "../components/general/footer";
import NameForm from "../components/form/name_form";
import CityForm from "../components/form/city_form";
import ExperienceForm from "../components/form/experience_form";
import ScaleForm from "../components/form/scale_form";

export default function Create() {

    const [step, setStep] = useState(0);
    const [architectName, setName] = useState("");
    const [cityName, setCity] = useState("Selecciona una region");
    const [selectedExperience, setExperience] = useState("");
    const [selectedScales, setScales] = useState<string[]>([]);

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    }

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    }

    let form;
    switch (step) {
        case -1:
            window.location.href = "/";
        break;

        case 0:
            form = <NameForm onNext={handleNext} onBack={handleBack} name = {architectName} setName={setName}/>;
        break;

        case 1:
            form = <CityForm onNext={handleNext} onBack={handleBack} cityName= {cityName} setName={setCity}/>;
        break;

        case 2:
            form = <ExperienceForm onNext={handleNext} onBack={handleBack} selectedExperience = {selectedExperience} setExperience={setExperience}/>;
        break;

        case 3:
            form = <ScaleForm onNext={handleNext} onBack={handleBack} selectedScales = {selectedScales} setScales={setScales}/>;
        break;

        default:
        form = <div>No hay más formularios</div>;
        break;
    }


  return (
    <div className="container">
      <div className="logoContainer">
        <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
      </div>
      <h1 className="title">tu mesa de proyectos</h1>
      {form}
      <Footer />
    </div>
  );
}