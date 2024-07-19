import React from 'react';

// Añade props para los eventos de clic
export default function TypeView(
    { availableHeight, onSearchArchitectsClick, onViewAllArchitectsClick }: { availableHeight: number, onSearchArchitectsClick: () => void, onViewAllArchitectsClick: () => void }) {
  return (
    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
        <div 
          style={{position: "absolute", top: `${availableHeight * 0.2}px`, fontSize: "large", cursor: "pointer", width: "15rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid black", borderRadius: "33px"}}
          onClick={onSearchArchitectsClick}
        >
          <div>buscar arquitectos</div>
          
        </div>
        <div 
          style={{position: "absolute", top: `${availableHeight * 0.737}px`, fontSize: "large", cursor: "pointer", width: "15rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid black", borderRadius: "33px"}}
          onClick={onViewAllArchitectsClick}
        >
          <div>ver todos los arquitectos</div>
        </div>
    </div>
  );
}