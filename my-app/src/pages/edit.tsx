import { useEffect, useState, useRef } from "react";
import Footer from "../components/general/footer";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { redirect } from "next/dist/server/api-utils";

export default function Edit() {
    const { user } = useUser();
    const correoArquitecto = user?.emailAddresses[0]?.emailAddress || "usuario sin correo";
    const [architect, setArchitect] = useState({ Name: '', City: '', Phone: '', id: 0, website: '', address: ''});
    const [cityName, setCityName] = useState("");
    const [experience, setExperience] = useState(0);
    const [scales, setScales] = useState(Array<number>());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phone, setPhone] = useState(architect.Phone);
    const [name, setName] = useState(architect.Name)

    const dropdownRef = useRef<HTMLDivElement>(null);

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
                    setArchitect({ Name: architectData.name, City: architectData.city, Phone: architectData.phone, id: architectData.id, website: architectData.website, address: architectData.address});
                    setCityName(architectData.city);
                    setExperience(architectData.experience);
                }

                const scalesResponse = await fetch(`/api/architect/${architectData.id}/scale`);

                if (scalesResponse.ok) {
                    const scalesData = await scalesResponse.json();
                    setScales(scalesData.map((scale: any) => scale.scale_id));
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

    const handleNext = async () => {
        const architectDataPatch = {
            email: correoArquitecto,
            phone: phone,
            name: architect.Name,
            city: cityName,
            experience_id: experience,
            website: architect.website,
            address: architect.address,
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

        for (const scale of scales) {
            const response3 = await fetch(`/api/architect/${architect.id}/scale/${scale}`, {
                method: 'POST',
            });

            if (!response3.ok) {
                alert("Error al actualizar las escalas");
                return;
            }
        }
        window.location.href = "/";
    };

    return (
        <div className="container">
            <div className="logoContainerSmall">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <div className="formContainer" style={{display: "unset"}}>
                <h1 style={{fontSize: "2.5vh", fontWeight: "bold", justifyContent:"center", display:"flex"}}>Hola! {correoArquitecto}</h1>
                <h1 style={{fontSize: "2.5vh", fontWeight: "bold", justifyContent:"center", display:"flex"}}>edita los datos que desees</h1>
                <div style={{ display: 'flex', marginBottom: '20px' , marginTop: '30px'}}>
                    <label htmlFor="nombre" style={{ marginRight: '10px', fontWeight: 'bold' }}>Nombre:</label>
                    <input 
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray" , textAlign: "center"}} 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    placeholder={architect.Name}
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <label htmlFor="region" style={{ marginRight: '10px', fontWeight: 'bold' }}>Ciudad:</label>
                    <select 
                        style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)"}}
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
                        style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)"}}
                        value={experience} 
                        onChange={e => setExperience(parseInt(e.target.value))}
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
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{ marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span style={{ margin: 'auto' }}> - Seleccionar Escalas -</span>
                    </button>
                    {isDropdownOpen && (
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
                    style={{marginLeft: "auto", width: "clamp(200px, 30vw, 300px)", borderBottom: "1px solid gray", textAlign: "center"}} 
                    type="text" 
                    id="phone"
                    name="phone" 
                    placeholder={architect.Phone}
                    onChange={(e) => setPhone(e.target.value)}/>
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
