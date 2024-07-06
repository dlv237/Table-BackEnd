import React from 'react';
import { useRouter } from 'next/router';
import Contact from '@/components/profile/contact';
import Experience from '@/components/profile/experience';
import Location from '@/components/profile/location';

type ArchitectData = {
    id: number;
    email: string;
    phone: string;
    name: string;
    city: string;
    address: string;
    website: string;
    experience_id: number;
}

type ImageData = {
    id: number;
    url: string;
    architect_id: number;
}

type ScaleData = {
    scale_id: number;
    architect_id: number;
}

export default function ArchitectProfile() {
    const [architectImagesUrl, setArchitectImagesUrl] = React.useState<ImageData[]>([]);
    const [architectData, setArchitectData] = React.useState<ArchitectData>();
    const [architectScales, setArchitectScales] = React.useState<ScaleData[]>([]);
    const [selectedTab, setSelectedTab] = React.useState<string>("experience");

    const router = useRouter();
    const { architect_id } = router.query;

    React.useEffect(() => {
        const fetchArchitectData = async () => {
            if (!architect_id) return;
            const result = await fetch(`/api/architect/${architect_id}`);

            if (result.ok) {
                const data = await result.json();
                setArchitectData(data);

                const images = await fetch(`/api/architect/${architect_id}/image`);
                const imagesData = await images.json();
                setArchitectImagesUrl(imagesData);
            }

            const scales = await fetch(`/api/architect/${architect_id}/scale`);
            const scalesData = await scales.json();
            setArchitectScales(scalesData);
        };

        fetchArchitectData();
    }, [architect_id]);

    return (
        <div className='container' style={{ width: "fit-content" }}>
            <div className="logoContainerSmall" style={{ marginBottom: "4vh", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <h1 className='architectName'>{architectData?.name}</h1>
            <div className="profileContainer" style={{ maxWidth: "100%" }}>
                <div className="tabContainer">
                    <div className="tab" onClick={() => setSelectedTab('experience')}>Experiencia</div>
                    <div className="tab" onClick={() => setSelectedTab('contact')}>Contacto</div>
                    <div className="tab" onClick={() => setSelectedTab('location')}>Ubicación</div>
                    <div className="tabIndicator" style={{ left: selectedTab === 'experience' ? '0%' : selectedTab === 'contact' ? '33.33%' : '66.66%' }} />
                </div>
                <div className="tabContent">
                    {selectedTab === 'experience' && architectData && <Experience architect={architectData} architectScales={architectScales} />}
                    {selectedTab === 'contact' && architectData && <Contact architect={architectData} />}
                    {selectedTab === 'location' && architectData && <Location architect={architectData} />}
                </div>
                <div className="profileImageGrid">
                    {architectImagesUrl.map((imageUrl, index) => (
                        <img className="architectImage" key={index} src={`https://architects-images.s3.us-east-2.amazonaws.com/${imageUrl.url}`} alt="profile" />
                    ))}
                </div>
            </div>
        </div>
    );
}
