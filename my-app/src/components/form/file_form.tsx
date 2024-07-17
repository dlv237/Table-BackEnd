import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import imageCompression from "browser-image-compression";
import { promisify } from 'util';
import { S3Client, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

type FileData = {
    name: string;
};

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    },
  });

const FileForm = forwardRef(({ onNext, onBack }: { onNext: () => void, onBack: () => void }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [order, setOrder] = useState<(number | null)[]>([]);
    
    useImperativeHandle(ref, () => ({
        uploadFiles: async () => {
            const orderedFiles = selectedFiles
                .map((file, index) => ({ file, order: order[index] }))
                .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
                .map(item => item.file);

            const uploadedFiles = [];
            for (const file of orderedFiles) {
                const uploadedFile = await uploadFile(file);
                uploadedFiles.push(uploadedFile);
            }
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
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            useWebWorker: true,
        });
    
        const reader = new FileReader();
        return new Promise<FileData>((resolve, reject) => {
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const fileName = await uploadImage(base64);
                resolve({ name: fileName });
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        });
    };

    const uploadImage = async (imageData: string): Promise<string> => {
        try {

            const uniqueId = uuidv4();
            const name = `image_${Date.now()}_${uniqueId}.jpg`;
            const contentType = 'image/jpeg';

            const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
            

            const base64Data = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            const params: PutObjectCommandInput = {
                Bucket: bucketName,
                Key: name,
                ContentType: contentType,
                Body: base64Data,
                ACL: 'public-read' as ObjectCannedACL,
            };


            const savedData = JSON.parse(localStorage.getItem("formData") || "{}");

            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);
            const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${name}`;
            localStorage.setItem("formData", JSON.stringify({
                ...savedData,
                selectedFiles: [
                    ...(savedData.selectedFiles || []),
                    { name: name }
                ]
            }));

            return name;

        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

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
            <div className="imageGrid">
                {selectedFiles.map((file, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img className="uploadImage" src={URL.createObjectURL(file)} alt={`Selected ${index + 1}`} />
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
        </div>
    );
});

export default FileForm;
