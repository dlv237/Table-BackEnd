import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/general/footer';
import emailjs from 'emailjs-com';


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
        { id: 1, name: "Habitacional" },
        { id: 2, name: "Comercial" },
        { id: 3, name: "Educacional" },
        { id: 4, name: "Industrial" },
        { id: 5, name: "Gastronómica" },
        { id: 6, name: "Paisaje" },
        { id: 7, name: "Urbano" },
        { id: 8, name: "Cultural" },
        { id: 9, name: "Salud" },
        { id: 10, name: "Otros" },
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

    const handleContactSender = async () => {
        
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const message = (document.getElementById("message") as HTMLInputElement).value;
        const architectEmail = architectData?.email;
        const architectName = architectData?.name;

        if (name === "" || email === "" || phone === "" || message === "") {
            alert("Por favor, llena todos los campos");
            return;
        }

        await fetch(`/api/mailer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message, architectEmail, architectName })
        }).then(() => {
            alert("Correo enviado exitosamente");
            fetch(`/api/architect/${architect_id}/stat`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: "contact" })
            });
            handleCloseForm();
        }).catch((error: any) => {
            alert("Error al enviar el correo");
            console.error('Error:', error as string);
        });
    };

    const handleBackImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const currentIndex = architectImagesUrl.findIndex((imageUrl) => imageUrl.url === selectedImage);
        if (currentIndex === 0) {
            setSelectedImage(architectImagesUrl[architectImagesUrl.length - 1].url);
        } else {
            setSelectedImage(architectImagesUrl[currentIndex - 1].url);
        }
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const currentIndex = architectImagesUrl.findIndex((imageUrl) => imageUrl.url === selectedImage);
        if (currentIndex === architectImagesUrl.length - 1) {
            setSelectedImage(architectImagesUrl[0].url);
        } else {
            setSelectedImage(architectImagesUrl[currentIndex + 1].url);
        }
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
                        <div className="scaleDataContainer" style={{ marginTop: "10px"}}>
                            <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                                <li typeof="disc">Experiencia:</li>
                            </h2>
                            <div className="profileData"> 
                                {experienceDict.find((exp) => exp.id === architectData?.experience_id)?.name}
                            </div>
                        </div>
                        <div className="scaleDataContainer">
                            <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                                <li typeof="disc">Tipos:</li>
                            </h2>
                            <div className="profileData"> 
                                <p>
                                    {architectScales.slice(0, 3).map((scale: ScaleData) =>
                                        scaleDict.find((scl) => scl.id === scale.scale_id)?.name
                                    ).join(' - ')}
                                </p>
                                <p>
                                    {architectScales.slice(3, 6).map((scale: ScaleData) =>
                                        scaleDict.find((scl) => scl.id === scale.scale_id)?.name
                                    ).join(' - ')}
                                </p>
                                <p>
                                    {architectScales.slice(6).map((scale: ScaleData) =>
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
                        <button className='nextButton' onClick={() => handleContactForm()}>Contactar</button>
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
                    <div className="leftArrow" onClick={handleBackImage}>
                        &lt;
                    </div>
                    <div className="rightArrow" onClick={handleNextImage}>
                        &gt;
                    </div>
                </div>
                
            )}
            {isContactFormVisible && architectData &&  (
                <div className="popupOverlay">
                <div className="popupFormContent">
                    <div className="formContainer">
                        <h1 className='architectContactName'>Contactar a {architectData?.name}</h1>
                        <div> 

                            <div className='contactContainerFirst'>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Nombre:</li>
                                </h2>
                                <input id="name" type="text" className="inputField"/>
                            </div>

                            <div className='contactContainer'>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Correo:</li>
                                </h2>
                                <input id="email" type="text" className="inputField"/>
                            </div>

                            <div className='contactContainer'>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Teléfono:</li>
                                </h2>
                                <input id="phone" type="text" className="inputField"/>
                            </div>

                            <div className='contactContainer'>
                                <h2 className="profileDataType" style={{marginRight: "15px"}}>
                                    <li typeof="disc">Mensaje:</li>
                                </h2>
                                <textarea id="message" placeholder="Mensaje"/>
                            </div>

                            <div className='contactContainerButtons'>
                                <button className='backButton' onClick={handleCloseForm}>Cancelar</button>
                                <button className='nextButton' onClick={handleContactSender}>Enviar</button>
                            </div>

                        </div> 
                    </div>
                </div>
                
            </div>
            )}
        </div>
    );
}
