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
        <div className="formContainer" style={{marginTop: `${availableHeight * 0.1}px`}}>
            <h1 style={{fontSize: "large"}}>elige la tipo que mejor</h1>
            <h1 style={{fontSize: "large"}}>se ajuste a tu proyecto</h1>
            <div className='experiencesContainer'>
                <div className="experienceOption">
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('1') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="1" style={{ display: 'none' }} onChange={() => handleScaleChange('1')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 1</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 1 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('2') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}>
                        <input type="checkbox" name="experience" value="2" style={{ display: 'none' }} onChange={() => handleScaleChange('2')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 2</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 2 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('3') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="3" style={{ display: 'none' }} onChange={() => handleScaleChange('3')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 3</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 3 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('4') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="4" style={{ display: 'none' }} onChange={() => handleScaleChange('4')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 4</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 4 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('5') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="5" style={{ display: 'none' }} onChange={() => handleScaleChange('5')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 5</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 5 </h1>
                    </label>
                </div>
                <div className="experienceOption">
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('6') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="6" style={{ display: 'none' }} onChange={() => handleScaleChange('6')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 6</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 6 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color:selectedScales.includes('7') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}>
                        <input type="checkbox" name="experience" value="7" style={{ display: 'none' }} onChange={() => handleScaleChange('7')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 7</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 7 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('8') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="8" style={{ display: 'none' }} onChange={() => handleScaleChange('8')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 8</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 8 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('9') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="9" style={{ display: 'none' }} onChange={() => handleScaleChange('9')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 9</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 9 </h1>
                    </label>
                    <label style={{ margin: `${availableHeight * 0.02}px 0`, flexFlow: "column", display: "flex", alignItems: "center", color: selectedScales.includes('10') ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer" }}>
                        <input type="checkbox" name="experience" value="10" style={{ display: 'none' }} onChange={() => handleScaleChange('10')}/> <h1 style={{fontSize: `${availableHeight * 0.02}px`}}>Tipo 10</h1>
                        <h1 style={{fontSize: `${availableHeight * 0.0137}px`}}>detalle del tipo 10 </h1>
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