import React from 'react';

type ScaleSelectorProps = {
    availableHeight: number;
    onBack: () => void;
    onNext: () => void;
    setSelectedScales: (scales: string[]) => void;
};

export default function ScaleSelector({ availableHeight, onNext, onBack, setSelectedScales }: ScaleSelectorProps) {

    const [selectedScales, setSelectedScalesInner] = React.useState<string[]>([]);

    const handleScaleChange = (value: string) => {
        if (selectedScales.includes(value)) {
            setSelectedScalesInner(selectedScales.filter(scale => scale !== value));
            setSelectedScales(selectedScales.filter(scale => scale !== value));
        } else {
            setSelectedScalesInner([...selectedScales, value]);
            setSelectedScales([...selectedScales, value]);
        }
    };


    return (
        <div className="formContainer" style={{marginTop: `${availableHeight * 0.1}px`}}>
            <h1 style={{fontSize: "large"}}>elige la escala que mejor</h1>
            <h1 style={{fontSize: "large"}}>se ajuste a tu proyecto</h1>
            <div className="experienceOption">
                <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Pequeña</h1>
                    <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>ampliaciones/remodelaciones de casas, quinchos, terrazas, cocinas, etc </h1>
                </label>
                <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}>
                    <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Media Baja</h1>
                    <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>casas, refugios, remodelaciones de oficinas, locales comerciales, etc </h1>
                </label>
                <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Media</h1>
                    <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>conjuntos de casas, edificios pequeños, centros médicos, etc </h1>
                </label>
                <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Media Alta</h1>
                    <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>edificios, clínicas/hospitales, universidades, centros comerciales, etc </h1>
                </label>
                <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                    <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Gran</h1>
                    <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>conjuntos de viviendas, parques industriales, planes maestros, etc </h1>
                </label>
            </div>
            <div className="buttonContainer" style={{position: "absolute", top: `${availableHeight * 0.8}px`, width: `${availableHeight * 0.4}px`}}>
                <button onClick={() => onBack()}>Volver</button>
                <button onClick={() => onNext()}>Siguiente</button>
            </div>
        </div>
    );
}