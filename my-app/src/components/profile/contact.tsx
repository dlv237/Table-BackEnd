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

export default function Contact({ architect }: { architect: ArchitectData }) {
    return (
        <div className="dataContainer">
            <div className="profileDataContainer">
                {architect.phone?.length > 0 ? (
                    <><h2 className="profileDataType">
                            <li typeof="disc">Teléfono:</li>
                        </h2>
                        <h2 className="profileData">
                            {architect.phone}
                        </h2></>
                ) : null}
            </div>
            <div className="profileDataContainer">
                {architect.email?.length > 0 ? (
                    <><h2 className="profileDataType">
                            <li typeof="disc">Correo:</li>
                        </h2>
                        <h2 className="profileData">
                            {architect.email}
                        </h2></>
                ) : null}
            </div>
            <div className="profileDataContainer">
                {architect.website?.length > 0 ? (
                    <><h2 className="profileDataType">
                            <li typeof="disc">Sitio Web:</li>
                        </h2>
                        <h2 className="profileData">
                            {architect.website}
                        </h2></>
                ) : null}
            </div>
        </div>
    );
}