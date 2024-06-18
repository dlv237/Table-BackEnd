import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

type FileData = {
    name: string;
};

const FileForm = forwardRef(({ onNext, onBack }: { onNext: () => void, onBack: () => void }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useImperativeHandle(ref, () => ({
        uploadFiles: async () => {
            const uploadedFiles = await Promise.all(selectedFiles.map(uploadFile));
            return uploadedFiles;
        }
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
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

    const uploadFile = async (file: File): Promise<FileData> => {
        const reader = new FileReader();
        return new Promise<FileData>((resolve, reject) => {
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const imageUrl = await uploadImage(base64);
                resolve({ name: file.name });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    const uploadImage = async (imageData: string): Promise<void> => {
        try {
            const res = await fetch('/api/s3-post-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageData }),
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await res.json();
            const { fileName } = data;
            
            const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
            localStorage.setItem("formData", JSON.stringify({
                ...savedData,
                selectedFiles: [
                    ...(savedData.selectedFiles || []),
                    { name: fileName } // Aquí guardas el fileName de S3
                ]
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
                {selectedFiles.map((file, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img style={{ width: "13vh", height: "13vh", objectFit: "cover", borderRadius: "5px" }} src={URL.createObjectURL(file)} alt={`Selected ${index + 1}`} />
                        <FontAwesomeIcon icon={faTimesCircle} style={{ position: 'absolute', top: "0.5vh", right: "0.5vh", cursor: 'pointer', color: "black", background: "white", borderRadius: "50px" }} onClick={() => handleRemoveFile(index)} />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default FileForm;
