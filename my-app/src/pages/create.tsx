import React, { useState } from "react";
import Footer from "../components/general/footer";
import NameForm from "../components/form/name_form";
import CityForm from "../components/form/city_form";

export default function Create() {

    const [step, setStep] = useState(0);

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
            form = <NameForm onNext={handleNext} onBack={handleBack} />;
        break;

        case 1:
            form = <CityForm onNext={handleNext} onBack={handleBack} />;
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