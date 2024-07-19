import React, { useEffect, useState } from 'react';
import Footer from '../components/general/footer';
import TypeView from '@/components/search/type_view';
import ScaleSelector from '@/components/search/scale_selector';
import RegionSelector from '@/components/search/region_selector';

export default function Search() {
    const [isWide, setIsWide] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(0);

    const [currentView, setCurrentView] = useState("typeView");
    const [selectedScales, setSelectedScales] = React.useState<string>('');
    const [selectedRegion, setSelectedRegion] = React.useState<string>("Todas las regiones");

    const handleSearchArchitectsClick = () => {
        setCurrentView("scaleSelector");
    }

    const handleBackToTypeView = () => {
        setCurrentView("typeView");
    }

    const handleToScaleSelector = () => {
        setCurrentView("scaleSelector");
    }

    const handleToRegionSelector = () => {
        if (selectedScales === "") {
            alert("Debes seleccionar al menos una escala");
            return
        }
        setCurrentView("regionSelector");
    }

    const handleSearch = () => {
        const scalesQuery = selectedScales;
        window.location.href = `/architects?scale=${scalesQuery}&region=${selectedRegion}`;
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsWide(window.innerWidth > 519);
                setAvailableHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);


    const handleViewAllArchitectsClick = () => {
        window.location.href = "/architects";
    };

    return (
        <div className='container' style={{
            backgroundImage: `url(/MESA_TABLE.png)`, 
            height: `${availableHeight}px`,
            backgroundSize: isWide ? "contain" : "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="subContainer">
                <div className="logoContainerSmall" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImageSmall" />
                </div>
                {currentView === 'typeView' && (
                    <TypeView
                        availableHeight={availableHeight}
                        onSearchArchitectsClick={handleSearchArchitectsClick}
                        onViewAllArchitectsClick={handleViewAllArchitectsClick}
                    />
                )}
                {currentView === 'scaleSelector' && (
                    <ScaleSelector
                        availableHeight={availableHeight}
                        onBack={handleBackToTypeView}
                        onNext={handleToRegionSelector}
                        setSelectedScales={setSelectedScales}
                    />
                )}
                {currentView === 'regionSelector' && (
                    <RegionSelector
                        availableHeight={availableHeight}
                        onBack={handleToScaleSelector}
                        onSearch={handleSearch}
                        setSelectedRegion={setSelectedRegion}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}
