import React from "react";

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



export default function ProfileCard({ architect }: { architect: ArchitectData }) {
    
    const experienceDict = [
        { id: 1, name: "empezando" },
        { id: 2, name: "1-5 años" },
        { id: 3, name: "5-10 años" },
        { id: 4, name: "+10 años" },
    ]
    
    const [architectImageUrl, setArchitectImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchImageUrl = async () => {
            const res = await fetch(`/api/architect/${architect.id}/image`);
            const data = await res.json();
            if (data.length === 0) {
                setArchitectImageUrl("DEFAULT_IMAGE.png");
            } else {
                const imageUrlOfSmallestId = data.reduce((prev: { id: number; }, current: { id: number; }) => prev.id < current.id ? prev : current).url;
                setArchitectImageUrl(imageUrlOfSmallestId);
            }
        };
        fetchImageUrl();
    }, [architect.id]);

    const handleCardClick = async () => {
        await fetch(`/api/architect/${architect.id}/stat`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: "view" })
        });
        window.location.href = `/architects/${architect.id}`;
    };

    return (
        <article className="card" onClick={handleCardClick}>
            <div className="background">

                <img src={`https://architects-images.s3.us-east-2.amazonaws.com/${architectImageUrl}`} />
            </div>
            <div className="content">
                <h2>{architect.name}</h2>
                <p className="experience">{experienceDict.find((exp) => exp.id === architect.experience_id)?.name}</p>
                <p className="address">{architect.address}</p>
            </div>
        </article>
    );
}