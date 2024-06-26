import React, { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    selectedValues: string[];
    setSelectedValues: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<Props> = ({ options, selectedValues, setSelectedValues }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSelection = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    return (
        <div className="selectOption">
            <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                Seleccionar Escalas
            </div>
            {isOpen && (
                <div style={{ position: 'absolute', zIndex: 10, background: 'white', border: '1px solid gray' }}>
                    {options.map((option) => (
                        <div key={option.value}>
                            <input
                                type="checkbox"
                                id={`checkbox-${option.value}`}
                                checked={selectedValues.includes(option.value)}
                                onChange={() => toggleSelection(option.value)}
                            />
                            <label htmlFor={`checkbox-${option.value}`}>{option.label}</label>
                        </div>
                    ))}
                </div>
            )}
            <div>Seleccionado: {selectedValues.join(', ')}</div>
        </div>
    );
};

export default MultiSelectDropdown;