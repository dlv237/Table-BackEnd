import React, { useState } from "react";
import Select from "react-select";

type SocialMedia = { type: string; handle: string };

interface ContactFormProps {
  onNext: () => void;
  onBack: () => void;
  telefono: string;
  setPhone: (telefono: string) => void;
  address: string;
  setAddress: (address: string) => void;
  website: string;
  setWebsite: (website: string) => void;
  socialMedia: SocialMedia[];
  setSocialMedia: (socialMedia: SocialMedia[]) => void;
  selectedOptions: string[];
  setSelectedOptions: (selectedOptions: string[]) => void;
}

export default function ContactForm({
  onNext,
  onBack,
  telefono,
  setPhone,
  address,
  setAddress,
  website,
  setWebsite,
}: ContactFormProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSocialMediaTypeChange = (index: number, value: string) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index].type = value;
    setSocialMedia(newSocialMedia);
    setSelectedOptions([...selectedOptions, value]);
  };

  const handleSocialMediaHandleChange = (index: number, value: string) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index].handle = value;
    setSocialMedia(newSocialMedia);
  };

  const handleAddSocialMedia = () => {
    if (socialMedia.length < 3) {
      const firstUnselectedOption = options.find(option => !selectedOptions.includes(option.value));

      if (firstUnselectedOption) {
        const newSocialMedia = [...socialMedia, { type: firstUnselectedOption.value, handle: '' }];
        setSocialMedia(newSocialMedia);

        setSelectedOptions([...selectedOptions, firstUnselectedOption.value]);
      }
    }
  };

  const handleRemoveSocialMedia = (index: number) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    setSocialMedia(newSocialMedia);
    setSelectedOptions(selectedOptions.filter(option => option !== socialMedia[index].type));
  };

  const options = [
    { value: 'Instagram', label: <><img src="/INSTAGRAM_LOGO.png" alt="Instagram" style={{ width: '20px', height: '20px' }} /></> },
    { value: 'Facebook', label: <><img src="/FACEBOOK_LOGO.png" alt="Facebook" style={{ width: '20px', height: '20px' }} /></> },
    { value: 'Pinterest', label: <><img src="/PINTEREST_LOGO.png" alt="Pinterest" style={{ width: '20px', height: '20px' }} /></> },
  ];

  const handleNext = async () => {
    if (telefono === "") {
      alert("Por favor, ingresa un teléfono de contacto");
    } else if (telefono.length != 9) {
      alert("Por favor, ingresa un teléfono válido de la forma 9 1234 5678");
    } else {
      const response = await fetch(`/api/architect`);
      const architects = await response.json();

      const architectExists = architects.find((architect: any) => architect.phone === telefono);
      if (!architectExists) {
        onNext();
      } else {
        alert("El teléfono ya está en uso");
      }
    }
  };

  return (
    <div className="formContainer">
      <h1 style={{ fontSize: "2.5vh", fontWeight: "bold" }}>¿Cómo te pueden contactar?</h1>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5vh", flexDirection: "column", alignItems: "center" }}>
        <input style={{ marginTop: "1.5vh" }} type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setPhone(e.target.value)} />
        <input style={{ marginTop: "1.5vh" }} type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input style={{ marginTop: "1.5vh" }} type="text" placeholder="Sitio web" value={website} onChange={(e) => setWebsite(e.target.value)} />

        {socialMedia.map((sm, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              options={options.filter(option => !selectedOptions.includes(option.value))}
              value={options.find(option => option.value === sm.type)}
              onChange={(option) => option && handleSocialMediaTypeChange(index, option.value)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: 'none',
                  boxShadow: 'none',
                }),
                menu: (provided) => ({
                  ...provided,
                  border: 'none',
                }),
              }}
            />
            <div style={{ display: "flex" }}>
              <input style={{ maxWidth: "150px" }} type="text" placeholder="@tu_red_social" value={sm.handle} onChange={(e) => handleSocialMediaHandleChange(index, e.target.value)} />
              <button onClick={() => handleRemoveSocialMedia(index)}>&times;</button>
            </div>
          </div>
        ))}
        {socialMedia.length < 3 && (
          <button onClick={handleAddSocialMedia}>+ Añadir Red Social</button>
        )}
      </div>
      <div className="buttonContainer">
        <button onClick={onBack}>Volver</button>
        <button onClick={handleNext}>Crear Cuenta</button>
      </div>
    </div>
  );
}