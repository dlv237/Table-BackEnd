import React from "react";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons';

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


type ArchitectNetworks = {
    id: number;
    architect_id: number;
    social_type: string;
    social_media: string;
}


export default function Contact({ architect, architect_networks }: { architect: ArchitectData, architect_networks: ArchitectNetworks[]}) {

    const instagramIcon = icon(faInstagram);
    const instagramIconString = instagramIcon.html.join('');
    const facebookIcon = icon(faFacebook);
    const facebookIconString = facebookIcon.html.join('');
    const pinterestIcon = icon(faPinterest);
    const pinterestIconString = pinterestIcon.html.join('');

    const options = [
        { value: 'Instagram', label: <div dangerouslySetInnerHTML={{ __html: instagramIconString }} />, website: 'https://www.instagram.com/'},
        { value: 'Facebook', label: <div dangerouslySetInnerHTML={{ __html: facebookIconString }} /> },
        { value: 'Pinterest', label: <div dangerouslySetInnerHTML={{ __html: pinterestIconString }} />, website: 'https://cl.pinterest.com/' },
      ];
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
            <div className="profileDataContainer" style={{justifyContent: "center", marginTop: "5px"}}>
                {architect_networks.map((network: ArchitectNetworks) => (
                    <div key={network.id} className="socialMediaContainer" 
                        onClick={() => window.location.href = `${options[options.findIndex(option => option.value === network.social_type)].website}${network.social_media}`}>
                        {<a href={network.social_media} target="_blank" rel="noopener noreferrer">
                            {options[options.findIndex(option => option.value === network.social_type)].label}
                        </a>}
                    </div>
                ))}
            </div>

        </div>
    );
}