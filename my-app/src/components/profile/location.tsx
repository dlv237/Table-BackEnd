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

export default function Location({ architect }: { architect: ArchitectData }) {
    return (
        <div className="dataContainer">
            <div className="profileDataContainer">
                {architect.city?.length > 0 ? (
                    <><h2 className="profileDataType">
                            <li typeof="disc">Region:</li>
                        </h2>
                        <h2 className="profileData">
                            {architect.city}
                        </h2></>
                ) : null}
            </div>
            <div className="profileDataContainer">
                {architect.address?.length > 0 ? (
                    <><h2 className="profileDataType">
                            <li typeof="disc">Dirección:</li>
                        </h2>
                        <h2 className="profileData">
                            {architect.address}
                        </h2></>
                ) : null}
            </div>
        </div>
    );
}