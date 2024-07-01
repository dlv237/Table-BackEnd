import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useUser } from "@clerk/nextjs";
import Footer from "../../components/general/footer";
import { useRouter } from "next/router";

type FileData = {
    name: string;
};

type FileOrUrl = File | string;


const FileForm = forwardRef(({ onNext, onBack }: { onNext: () => void, onBack: () => void }, ref) => {
    const [architectId, setArchitectId] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileOrUrl[]>([]);
    const [order, setOrder] = useState<(number | null)[]>([]);
    const router = useRouter();

    const [confirmationMessage, setConfirmationMessage] = useState<JSX.Element>(<></>);

    const { user } = useUser();
    const correoArquitecto = user?.emailAddresses[0]?.emailAddress || "usuario sin correo";

 
    let confirmation = <></>;

    const uploadFiles = async () =>{

        const uploadedFiles = [];

        setConfirmationMessage(<h1>actualizando fotos...</h1>);

        const orderedFiles = selectedFiles
            //.filter((file): file is File => file instanceof File)
            .map((file, index) => ({ file, order: order[index] }))
            .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
            .map(item => item.file);

        const deleteResponse = await fetch(`/api/architect/${architectId}/image`, {
            method: "DELETE",
        });

        if (!deleteResponse.ok) {
            console.error('Failed to delete images');
            return;
        }

        for (const file of orderedFiles) {
            if (file instanceof File) {
                const uploadedFile = await uploadFile(file);
                const dataFile = {
                    name: uploadedFile.name,
                }
                const postResponse = await fetch(`/api/architect/${architectId}/image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataFile),
                });
                if (!postResponse.ok) {
                    console.error('Failed to post image');
                    return;
                }
                uploadedFiles.push(uploadedFile);
            }
            else{
                let nameFile = file.split('/').pop();
                const dataFile = {
                    name: nameFile,
                }
                const postResponse = await fetch(`/api/architect/${architectId}/image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataFile),
                });
                if (!postResponse.ok) {
                    console.error('Failed to post image');
                    return;
                }
                uploadedFiles.push({ name: nameFile });
            
            }
        }
        setConfirmationMessage(<h1>fotos actualizadas</h1>);
        return uploadedFiles;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const newFileURLs = newFiles.map(file => URL.createObjectURL(file));
            if (selectedFiles.length + newFiles.length > 9) {
                alert("No puedes seleccionar más de 9 archivos en total");
            } else {
                setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
                setOrder(prevOrder => [...prevOrder, ...newFiles.map(() => null)]);
            }
        }
    }

    const handleRemoveFile = (index: number) => {
        const removedOrder = order[index];
        setSelectedFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
        if (removedOrder !== null) {
            setOrder(prevOrder => prevOrder.filter((_, i) => i !== index).map(o => o !== null && o > removedOrder ? o - 1 : o));
        } else {
            setOrder(prevOrder => prevOrder.filter((_, i) => i !== index));
        }
    }

    const handleOrderChange = (index: number, checked: boolean) => {
        const newOrder = [...order];
        if (checked) {
            newOrder[index] = newOrder.filter(Number.isInteger).length + 1;
        } else {
            const removedOrder = newOrder[index];
            if (removedOrder !== null) {
                newOrder[index] = null;
                for (let i = 0; i < newOrder.length; i++) {
                    if (newOrder[i] !== null && newOrder[i]! > removedOrder) {
                        newOrder[i]!--;
                    }
                }
            }
        }
        setOrder(newOrder);
    }

    const uploadFile = async (file: File): Promise<FileData> => {
        const reader = new FileReader();
        return new Promise<FileData>((resolve, reject) => {
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const fileName = await uploadImage(base64);
                resolve({ name: fileName });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    const uploadImage = async (imageData: string): Promise<string> => {
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
            console.log('Uploaded image URL:', fileName);
            return fileName;

        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && correoArquitecto) {
                const response = await fetch('/api/architect');
                const architects = await response.json();
                const architectData = architects.find((arch: any) => arch.email === correoArquitecto);
                setArchitectId(architectData.id);
    
                const imagesUrlResponse = await fetch(`/api/architect/${architectData.id}/image`);
                const imagesUrlData = await imagesUrlResponse.json();
                setSelectedFiles(imagesUrlData.map((img: any) => `https://architects-images.s3.us-east-2.amazonaws.com/${img.url}`));
                setOrder(imagesUrlData.map(() => null));
            }
        };
        fetchUserData();
    }, [correoArquitecto, user]);

    useEffect(() => {
        const spans = document.querySelectorAll('.numberSpan');
        spans.forEach((span, index) => {
            if (order[index] !== null) {
                span.classList.add('show');
            } else {
                span.classList.remove('show');
            }
        });
    }, [order]);

    return (
        <div className="container">
            <div className="logoContainerSmall">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
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
                <h1 style={{ fontSize: "1.75vh", marginTop: "10px", marginBottom: "10px" }}>Selecciona el orden que desees</h1>
                <div className="imageGrid" style={{height: "40vh", gridTemplateRows: "repeat(3, 1fr)"}}>
                    {selectedFiles.map((fileOrUrl, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <img className="uploadImage" src={typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl)} alt={`Selected ${index + 1}`} />
                            <div>
                                <span className="circleBackground"></span>
                                <span className="numberSpan">
                                    {order[index]}
                                </span>
                                <input 
                                    type="checkbox" 
                                    className="backCheckBox"
                                    checked={order[index] !== null}
                                    onChange={(e) => handleOrderChange(index, e.target.checked)}
                                />
                            </div>
                            <FontAwesomeIcon icon={faTimesCircle} className="removeCrossButton" onClick={() => handleRemoveFile(index)} />
                        </div>
                    ))}
                </div>
                <div>{confirmationMessage}</div>
            </div>
            <div className="buttonContainer">
                <button onClick={() => router.push('/edit')}>Volver</button>
                <button onClick={() => uploadFiles()}>Confirmar</button>
            </div>
            <Footer />
        </div>
    );
});

export default FileForm;
