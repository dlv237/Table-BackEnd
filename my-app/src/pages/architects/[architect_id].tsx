import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/general/footer';

type ArchitectData = {
    id: number;
    email: string;
    phone: string;
    name: string;
    city: string;
    address: string;
    website: string;
    experience_id: number;
    description: string;
}

type ImageUrlData = {
    id: number;
    url: string;
    architect_id: number;
}

type ScaleData = {
    scale_id: number;
    architect_id: number;
}

type ArchitectNetworks = {
    id: number;
    architect_id: number;
    social_type: string;
    social_media: string;
}

export default function ArchitectProfile() {
    const [architectImagesUrl, setArchitectImagesUrl] = React.useState<ImageUrlData[]>([]);
    const [architectData, setArchitectData] = React.useState<ArchitectData>();
    const [architectScales, setArchitectScales] = React.useState<ScaleData[]>([]);
    const [selectedTab, setSelectedTab] = React.useState<string>("experience");
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [architectNetworks, setArchitectNetworks] = React.useState<ArchitectNetworks[]>([]);
    const [description, setDescription] = React.useState<string>("No se proporcionó una descripción.");
    const [isContactFormVisible, setIsContactFormVisible] = React.useState<boolean>(false);

    const router = useRouter();
    const { architect_id } = router.query;

    const experienceDict = [
        { id: 1, name: "empezando" },
        { id: 2, name: "1-5 años" },
        { id: 3, name: "5-10 años" },
        { id: 4, name: "+10 años" },
    ];

    const scaleDict = [
        { id: 1, name: "baja" },
        { id: 2, name: "media baja" },
        { id: 3, name: "media" },
        { id: 4, name: "media alta" },
        { id: 5, name: "gran" }
    ];

    React.useEffect(() => {
        const fetchArchitectData = async () => {
            if (!architect_id) return;
            const result = await fetch(`/api/architect/${architect_id}`);

            if (result.ok) {
                const data = await result.json();
                setArchitectData(data);
                if (data.description != '')
                    setDescription(data.description);

                const images = await fetch(`/api/architect/${architect_id}/image`);
                const imagesData = await images.json();
                setArchitectImagesUrl(imagesData);
            }

            const scales = await fetch(`/api/architect/${architect_id}/scale`);
            const scalesData = await scales.json();
            setArchitectScales(scalesData);

            const networks = await fetch(`/api/architect/${architect_id}/network`);
            const networksData = await networks.json();
            setArchitectNetworks(networksData);
        };

        fetchArchitectData();
    }, [architect_id]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedImage(null);
    };

    const handleContactForm = () => {
        setIsContactFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsContactFormVisible(false);
    };

    return (
        <div className='container' style={{ width: "fit-content" }}>
            <div className="logoContainerSmall" style={{ marginBottom: "4vh", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <h1 className='architectName'>{architectData?.name}</h1>
            <div className="profileContainer" style={{ maxWidth: "100%" }}>
                <div className="tabContainer">
                    {architectData?.city}
                </div>
                <div className='descriptionContainer'>"{description}"</div>
                <div className="tabContent">
                    <div className= "dataContainer"> 
                        <div className="scaleDataContainer">
                            <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                                <li typeof="disc">Experiencia:</li>
                            </h2>
                            <div className="profileData"> 
                                {experienceDict.find((exp) => exp.id === architectData?.experience_id)?.name}
                            </div>
                        </div>
                        <div className="scaleDataContainer">
                            <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                                <li typeof="disc">Escalas:</li>
                            </h2>
                            <div className="profileData"> 
                                <p>
                                    {architectScales.slice(0, 3).map((scale: ScaleData) =>
                                        scaleDict.find((scl) => scl.id === scale.scale_id)?.name
                                    ).join(' - ')}
                                </p>
                                <p>
                                    {architectScales.slice(3).map((scale: ScaleData) =>
                                        scaleDict.find((scl) => scl.id === scale.scale_id)?.name
                                    ).join(' - ')}
                                </p>    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileImageGrid">
                    {architectImagesUrl.map((imageUrl, index) => (
                        <img className="architectImage" key={index} src={`https://architects-images.s3.us-east-2.amazonaws.com/${imageUrl.url}`} alt="profile" onClick={() => handleImageClick(imageUrl.url)} />
                    ))}
                </div>
                <div className="buttonContainer" style={{marginTop: '4vh', width: '80%'}}>
                    <div>
                        <button style={{color: '#161518', fontWeight: 'bold'}} onClick={() => window.history.back()}>Volver</button>
                    </div>
                    <div>
                        <button style={{width: '6rem', color:'white', height: '2rem', background:'#211f26', borderRadius: '33px'}} onClick={() => handleContactForm()}>Contactar</button>
                    </div>

                </div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>   
                    <Footer />
                </div>
            </div>

            {isPopupVisible && selectedImage && (
                <div className="popupOverlay" onClick={handleClosePopup}>
                    <div className="popupContent">
                        <img src={`https://architects-images.s3.us-east-2.amazonaws.com/${selectedImage}`} alt="popup" className="popupImage" />
                    </div>
                </div>
            )}
            {isContactFormVisible && (
                <div className="popupOverlay">
                <div className="popupContent" style={{background: "white", minWidth: "23rem", minHeight: "70%", maxHeight: "80%"}}>
                    <div className="formContainer">
                        <h1 style={{fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", maxWidth: "17rem"}}>Contactar a {architectData?.name}</h1>
                        <div> 
                            <div className='scaleDataContainer' style={{marginTop: "2rem", marginBottom: "1rem"}}>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Nombre:</li>
                                </h2>
                                <input type="text" className="inputField" style={{borderBottom: "1px solid gray", marginLeft: "auto", width: "13rem"}}/>
                            </div>
                            <div className='scaleDataContainer' style={{marginBottom: "1rem"}}>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Correo:</li>
                                </h2>
                                <input type="text" className="inputField" style={{borderBottom: "1px solid gray", marginLeft: "auto", width: "13rem"}}/>
                            </div>
                            <div className='scaleDataContainer' style={{marginBottom: "1rem"}}>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Teléfono:</li>
                                </h2>
                                <input type="text" className="inputField" style={{borderBottom: "1px solid gray", marginLeft: "auto", width: "13rem"}}/>
                            </div>
                            <div className='scaleDataContainer' style={{marginBottom: "1rem"}}>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Mensaje:</li>
                                </h2>
                                <textarea placeholder="Mensaje" className="inputField" style={{width: "13rem", height: "12rem", background: "rgba(0, 0, 0, 0.05)", fontSize: "0.9rem", textAlign: 'center'}}/>
                            </div>
                            <div className='scaleDataContainer' style={{display: "flex", justifyContent: "space-between", marginTop: "5rem"}}>
                                <button style={{width: '6rem', color:'black', height: '2rem', background:'rgb(230, 230, 230)', borderRadius: '33px'}} onClick={handleCloseForm}>Cancelar</button>
                                <button style={{width: '6rem', color:'white', height: '2rem', background:'#211f26', borderRadius: '33px'}}>Enviar</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
