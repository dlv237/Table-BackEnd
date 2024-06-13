import React, { useState } from 'react';

const UploadAndShowImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const imageUrl = await uploadImage(base64);
      console.log('Image URL:', imageUrl);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir imagen</button>
    </div>
  );
};

const uploadImage = async (imageData: string) => {
  try {
    const res = await fetch('/api/s3-post-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });

    if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await res.json();
    console.log('Uploaded image URL:', data.imageUrl);
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export default UploadAndShowImage;