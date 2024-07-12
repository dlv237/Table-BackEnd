import { useEffect, useState, useRef } from "react";
import Footer from "../components/general/footer";
import { useUser } from "@clerk/nextjs";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons';
import Select from "react-select";

const instagramIcon = icon(faInstagram);
const instagramIconString = instagramIcon.html.join('');
const facebookIcon = icon(faFacebook);
const facebookIconString = facebookIcon.html.join('');
const pinterestIcon = icon(faPinterest);
const pinterestIconString = pinterestIcon.html.join('');


export default function Edit() {
    type SocialMedia = { type: string; handle: string };

    const { user } = useUser();
    const correoArquitecto = user?.emailAddresses[0]?.emailAddress || "usuario sin correo";
    const [architect, setArchitect] = useState({ Name: '', City: '', Phone: '', id: 0, website: '', address: '', experience: 0, description: ''});
    const [cityName, setCityName] = useState("");
    const [experience, setExperience] = useState(architect.experience);
    const [scales, setScales] = useState(Array<number>());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
    const [phone, setPhone] = useState(architect.Phone);
    const [name, setName] = useState(architect.Name)
    const [website, setWebsite] = useState(architect.website);
    const [address, setAddress] = useState(architect.address);
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [description, setDescription] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { value: 'Instagram', label: <div dangerouslySetInnerHTML={{ __html: instagramIconString }} /> },
        { value: 'Facebook', label: <div dangerouslySetInnerHTML={{ __html: facebookIconString }} /> },
        { value: 'Pinterest', label: <div dangerouslySetInnerHTML={{ __html: pinterestIconString }} /> },
      ];

    const cityDict = [
        "RM - Metropolitana de Santiago",
        "I - Tarapacá",
        "II - Antofagasta",
        "III - Atacama",
        "IV - Coquimbo",
        "V - Valparaíso",
        "VI - Libertador General Bernardo O'Higgins",
        "VII - Maule",
        "VIII - Biobío",
        "IX - La Araucanía",
        "X - Los Lagos",
        "XI - Aisén del G. Carlos Ibáñez del Campo",
        "XII - Magallanes y de la Antártica Chilena",
        "XIV - Los Ríos",
        "XV - Arica y Parinacota",
        "XVI - Ñuble",
    ];
    const experienceDict = [
        { value: 0, label: "Estamos empezando!" },
        { value: 1, label: "Entre 1 y 5 años" },
        { value: 2, label: "Entre 5 y 10 años" },
        { value: 3, label: "Más de 10 años" },
    ];
    const scalesDict = [
        { value: 1, label: "Pequeña"},
        { value: 2, label: "Media Baja"},
        { value: 3, label: "Media"},
        { value: 4, label: "Media Alta"},
        { value: 5, label: "Gran"}
    ];

    const handleSocialMediaTypeChange = (index: number, value: string) => {
        const newSocialMedia = [...socialMedia];
        const previousType = newSocialMedia[index].type;
        newSocialMedia[index].type = value;
        setSocialMedia(newSocialMedia);
        setSelectedOptions(selectedOptions.filter(option => option !== previousType).concat(value));
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

    const handleScaleChange = (value: number) => {
        if (scales.includes(value)) {
            setScales(scales.filter(scale => scale !== value));
        } else {
            setScales([...scales, value]);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && correoArquitecto !== "usuario sin correo") {
                const response = await fetch('/api/architect');
                const architects = await response.json();
                
                const architectData = architects.find((arch: any) => arch.email === correoArquitecto);
                
                if (architectData) {
                    setArchitect({ Name: architectData.name, City: architectData.city, Phone: architectData.phone, id: architectData.id, website: architectData.website, address: architectData.address, experience: architectData.experience, description: architectData.description});
                    setCityName(architectData.city);
                    setExperience(architectData.experience);
                    setPhone(architectData.phone);
                    setName(architectData.name);
                    setWebsite(architectData.website);
                    setAddress(architectData.address);
                    setDescription(architectData.description);
                }

                const scalesResponse = await fetch(`/api/architect/${architectData.id}/scale`);

                if (scalesResponse.ok) {
                    const scalesData = await scalesResponse.json();
                    setScales(scalesData.map((scale: any) => scale.scale_id));
                }

                const networksResponse = await fetch(`/api/architect/${architectData.id}/network`);
                if (networksResponse.ok) {
                    const networksData = await networksResponse.json();
                    const socialMediaData = networksData.map((network: any) => ({ type: network.social_type, handle: network.social_media }));
                    setSocialMedia(socialMediaData);
                    setSelectedOptions(socialMediaData.map((network: any) => network.type));
                }
            }
        };
        fetchUserData();
    }, [correoArquitecto, user]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setIsSocialDropdownOpen(false);
            }
        };
    
        if (isDropdownOpen || isSocialDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen, isSocialDropdownOpen]);
    

    const handleNext = async () => {
        const architectDataPatch = {
            email: correoArquitecto,
            phone: phone,
            name: name,
            city: cityName,
            experience_id: experience,
            website: website,
            address: address,
            description: description,
        };

        const response = await fetch(`/api/architect/${architect.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(architectDataPatch),
        });

        if (!response.ok) {
            alert("Error al actualizar los datos, el nombre o el teléfono estan en uso por otro usuario");
            return;
        }

        const response2 = await fetch(`/api/architect/${architect.id}/scale`, {
            method: 'DELETE',
        });

        if (!response2.ok) {
            alert("Debes iniciar sesión antes de editar tus escalas");
            return;
        }

        await fetch(`/api/architect/${architect.id}/network`, {
            method: 'DELETE',
        });

        for (const scale of scales) {
            const response3 = await fetch(`/api/architect/${architect.id}/scale/${scale}`, {
                method: 'POST',
            });

            if (!response3.ok) {
                alert("Error al actualizar las escalas");
                return;
            }
        }

        for (const sm of socialMedia) {
            if (sm.type && sm.handle != "") {
                const network = {
                    social_type: sm.type,
                    social_media: sm.handle,
                }
                const response4 = await fetch(`/api/architect/${architect.id}/network`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(network),
                });

                if (!response4.ok) {
                    alert("Error al actualizar las redes sociales");
                    return;
                }
            }
        }
        window.location.href = "/";
    };

    return (
        <div className="container">
            <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <div className="formContainer" style={{display: "unset"}}>
                <h1 style={{fontSize: "2.5vh", fontWeight: "bold", justifyContent:"center", display:"flex"}}>Hola! {correoArquitecto}</h1>
                <h1 style={{fontSize: "2.5vh", fontWeight: "bold", justifyContent:"center", display:"flex"}}>edita tus datos</h1>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="nombre" style={{ marginRight: '10px', fontWeight: 'bold' }}>Nombre:</label>
                    <input 
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray" , textAlign: "center", background: "none"}} 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    placeholder={architect.Name}
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <label htmlFor="region" style={{ marginRight: '10px', fontWeight: 'bold' }}>Región:</label>
                    <select 
                        style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", background: "none"}}
                        value={cityName} 
                        onChange={e => setCityName(e.target.value)}
                        className="selectOption"
                    >
                        {cityDict.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <label htmlFor="experience" style={{ marginRight: '10px', fontWeight: 'bold' }}>Experiencia:</label>
                    <select
                        style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)" , background: "none"}}
                        value={experience} 
                        onChange={e => setExperience(Number(e.target.value))}
                        className="selectOption"
                    >
                        {experienceDict.map(exp => (
                            <option key={exp.value} value={exp.value}>
                                {exp.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px', position: 'relative' }}>
                    <label htmlFor="scales" style={{ marginRight: '10px', fontWeight: 'bold' }}>Escalas:</label>
                    <button
                        onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setIsSocialDropdownOpen(false);
                        }}
                        style={{ marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span style={{ margin: 'auto' }}>- Seleccionar Escalas -</span>
                    </button>
                    {isDropdownOpen && !isSocialDropdownOpen && (
                        <div className="dropdown" style={dropdownStyles} ref={dropdownRef}>
                            {scalesDict.map((scale) => (
                                <label 
                                    key={scale.value} 
                                    style={{color: scales.includes(scale.value) ? 'black' : 'gray', transition: 'color 0.5s', cursor: "pointer"}}
                                >
                                    <input
                                        type="checkbox"
                                        name="scales"
                                        style={{ display: 'none' }}
                                        value={scale.value}
                                        checked={scales.includes(scale.value)}
                                        onChange={() => handleScaleChange(scale.value)}
                                    />
                                    {scale.label}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="telefono" style={{ marginRight: '10px', fontWeight: 'bold' }}>Teléfono:</label>
                    <input 
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray", textAlign: "center" , background: "none"}} 
                    type="text" 
                    id="phone"
                    name="phone" 
                    placeholder={architect.Phone}
                    onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="website" style={{ marginRight: '10px', fontWeight: 'bold' }}>Sitio Web:</label>
                    <input 
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray", textAlign: "center" , background: "none"}} 
                    type="text" 
                    id="website"
                    name="website" 
                    placeholder={architect.website}
                    onChange={(e) => setWebsite(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="address" style={{ marginRight: '10px', fontWeight: 'bold' }}>Dirección:</label>
                    <input 
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray", textAlign: "center", background: "none"}} 
                    type="text" 
                    id="address"
                    name="address" 
                    placeholder={architect.address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px', position: 'relative', marginTop: '30px' }}>
                    <label htmlFor="socialMedia" style={{ marginRight: '10px', fontWeight: 'bold' }}>Redes sociales:</label>
                    <button
                        onClick={() => {
                            setIsSocialDropdownOpen(!isSocialDropdownOpen);
                            setIsDropdownOpen(false);
                        }}
                        style={{ marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span style={{ margin: 'auto' }}>- Selecciona tus redes  -</span>
                    </button>
                    {isSocialDropdownOpen && !isDropdownOpen && (
                        <div className="dropdown" style={dropdownStyles} ref={dropdownRef}>
                            {socialMedia.map((sm, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                <Select
                                isSearchable={false}
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
                                <input style={{ maxWidth: "100px", textAlign: "center" }} type="text" placeholder="@tu_red" value={sm.handle} onChange={(e) => handleSocialMediaHandleChange(index, e.target.value)} />
                                <button onClick={() => handleRemoveSocialMedia(index)}>&times;</button>
                                </div>
                            </div>
                            ))}
                            {socialMedia.length < 3 && (
                            <button onClick={handleAddSocialMedia}>+ Añadir Red Social</button>
                            )}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="description" style={{ marginRight: '10px', fontWeight: 'bold' }}>Descripción:</label>
                    <textarea 
                    id="description"
                    name="description"
                    className="descriptionInputEdit"
                    placeholder={architect.description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{background: "none"}}/>
                </div>
                <div 
                    style={{ display: 'flex', marginBottom: '20px', position: 'relative', marginTop: '30px', cursor: "pointer" }}
                    onClick={() => window.location.href = "/edit/photos"}>
                    <span style={{ margin: 'auto' }}>- Edita tus fotos  -</span>
                </div>
            </div>
            <div className="buttonContainer">
                <button onClick={() => window.location.href = "/"}>Volver</button>
                <button onClick={handleNext}>Confirmar</button>
            </div>
            <Footer />
        </div>
    );
}

const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    padding: '10px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    width: 'clamp(200px, 30vw, 300px)',
} as React.CSSProperties;
