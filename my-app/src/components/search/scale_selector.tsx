import React from 'react';

type ScaleSelectorProps = {
    availableHeight: number;
    onBack: () => void;
    onNext: () => void;
    setSelectedScales: (scales: string) => void;
};

export default function ScaleSelector({ availableHeight, onNext, onBack, setSelectedScales }: ScaleSelectorProps) {

    const [selectedScales, setSelectedScalesInner] = React.useState<string>('');

    const handleScaleChange = (value: string) => {
        if (selectedScales.includes(value)) {
            setSelectedScalesInner('');
            setSelectedScales('');
        } else {
            setSelectedScalesInner(value);
            setSelectedScales(value);
        }
    };


    return (
        <div className="formContainer" style={{marginTop: `${availableHeight * 0.08}px`}}>
            <h1 style={{fontSize: "1rem"}}>elige el tipo que mejor</h1>
            <h1 style={{fontSize: "1rem"}}>se ajuste a tu proyecto</h1>
            <div className='experiencesContainer'>
                <div className="experienceOption">
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Habitacional</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>casas, ampliaciones... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem"}}>
                        <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Comercial</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>locales, oficinas... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Educacional</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>colegios, jardín infantil... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Industrial</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>bodegas, centro de distribución...</h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Gastronómica</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>restaurantes, café... </h1>
                    </label>
                </div>
                <div className="experienceOption">
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('6') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="6" style={{ display: 'none' }} onChange={() => handleScaleChange('6')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Paisaje</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>jardines, parques... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('7') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="7" style={{ display: 'none' }} onChange={() => handleScaleChange('7')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Urbano</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>planes maestros, paseos... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('8') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="8" style={{ display: 'none' }} onChange={() => handleScaleChange('8')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Cultural</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>museos, centros culturales... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('9') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="9" style={{ display: 'none' }} onChange={() => handleScaleChange('9')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Salud</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>clínicas, veterinarias... </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('10') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer", height: "3rem" }}>
                        <input type="checkbox" name="experience" value="10" style={{ display: 'none' }} onChange={() => handleScaleChange('10')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Otros</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0175}px`}}>religioso, institucional... </h1>
                    </label>
                </div>
            </div>
            <div className="buttonContainer" style={{position: "absolute", top: `${availableHeight * 0.8}px`, width: `${availableHeight * 0.4}px`}}>
                <button onClick={() => onBack()}>Volver</button>
                <button onClick={() => onNext()}>Siguiente</button>
            </div>
        </div>
    );
}