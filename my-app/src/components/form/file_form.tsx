import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function FileForm({ onNext, onBack }:
    { onNext: () => void, onBack: () => void }) {

    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            if (selectedFiles.length + newFiles.length > 9) {
                alert("No puedes seleccionar más de 9 archivos en total");
            } else {
                setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
            }
        }
    }

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
    }

    return (
        <div className="formContainer">
            <h1 style={{ fontSize: "2.5vh", fontWeight: "bold" }}>elige hasta 9 imágenes para</h1>
            <h1 style={{ fontSize: "2.5vh", fontWeight: "bold" }}>crear tu portafolio</h1>
            <input 
                type="file" 
                id="fileInput" 
                accept="image/png, image/jpeg" 
                multiple 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
            />
            <label htmlFor="fileInput">
                <div className="bigSquare" style={{cursor: "pointer"}}>
                    <p style={{ fontSize: "1.75vh", fontWeight: "bold" }}>
                        <FontAwesomeIcon icon={faArrowUpFromBracket} style={{marginRight: "5px"}} />
                          Seleccionar los archivos a subir</p>
                    <p style={{ fontSize: "1.5vh", marginTop: "9px"}}>Puedes subir imágenes en JPG y PNG</p>
                    <p style={{ fontSize: "1.5vh"}}>de hasta 10 Mb</p>
                </div>
            </label>
            <div className="imageGrid">
                {selectedFiles.map((file, index) => {
                    return (
                        <div key={index} style={{ position: 'relative' }}>
                            <img style={{ width: "13vh", height: "13vh", objectFit: "cover", borderRadius: "5px" }} src={file} alt={`Selected ${index + 1}`} />
                            <FontAwesomeIcon icon={faTimesCircle} style={{ position: 'absolute', top: "0.5vh", right: "0.5vh", cursor: 'pointer' }} onClick={() => handleRemoveFile(index)} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}