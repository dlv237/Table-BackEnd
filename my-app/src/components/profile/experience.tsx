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

type ScaleData = {
    scale_id: number;
    architect_id: number;
}

export default function Experience({ architect, architectScales }: { architect: ArchitectData, architectScales: ScaleData[] }) {
    const scaleDict = [
        { id: 1, name: "baja" },
        { id: 2, name: "media baja" },
        { id: 3, name: "media" },
        { id: 4, name: "media alta" },
        { id: 5, name: "gran" }
    ];

    const experienceDict = [
        { id: 1, name: "empezando" },
        { id: 2, name: "1-5 años" },
        { id: 3, name: "5-10 años" },
        { id: 4, name: "+10 años" },
    ];

    if (!architect) {
        return null;
    }

    return (
        <div className="dataContainerVertical">
            <div className="profileDataContainerVertical">
                <div className="scaleDataContainer">
                    <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                        Experiencia:
                    </h2>
                    <h2 className="profileData">
                        {experienceDict.find((exp) => exp.id === architect.experience_id)?.name}
                    </h2>
                </div>
            </div>
            <div className="profileDataContainerVertical">
                <div className="scaleDataContainer">
                    <h2 className="profileDataType" style={{ marginBottom: "10px" }}>
                        Escalas:
                    </h2>
                    <div className="profileData">
                        {architectScales.map((scale: ScaleData) => (
                            <p key={scale.scale_id}>{scaleDict.find((scl) => scl.id === scale.scale_id)?.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
