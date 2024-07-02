import React from 'react';

// Añade props para los eventos de clic
export default function TypeView(
    { availableHeight, onSearchArchitectsClick, onViewAllArchitectsClick }: { availableHeight: number, onSearchArchitectsClick: () => void, onViewAllArchitectsClick: () => void }) {
  return (
    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
        <div 
          style={{position: "absolute", top: `${availableHeight * 0.8}px`, fontSize: "large", cursor: "pointer"}}
          onClick={onSearchArchitectsClick}
        >
          buscar arquitectos
        </div>
        <div 
          style={{position: "absolute", top: `${availableHeight * 0.17}px`, fontSize: "large", cursor: "pointer"}}
          onClick={onViewAllArchitectsClick}
        >
          ver todos los arquitectos
        </div>
    </div>
  );
}