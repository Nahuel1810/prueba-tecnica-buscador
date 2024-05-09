import React, { useState } from 'react';
import { useFilters } from '../../../contexts/FilterContext';

function Radio({ options }) {
    const { filters, setFilters } = useFilters();

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setFilters(prevFilters => ({ ...prevFilters, type: selectedOption }));
    };

    return (
        <div className="p-2 rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-gray-100">
            {options.length > 0 && options.map((option) => (
                <label
                    key={option.value}
                    className={`inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent ${filters.type === option.value ? 'border-primary bg-accent/50 font-bold' : ''
                        } hover:bg-accent/50 transition-all cursor-pointer`}
                >
                    <div className="inline-flex items-center justify-center gap-2 relative z-10">
                        <p className="font-semibold">{option.label}</p>
                    </div>
                    <input
                        className="checked:text-accent checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                        value={option.value}
                        name="Options"
                        type="radio"
                        checked={filters.type === option.value}
                        onChange={handleOptionChange}
                    />
                </label>
            ))}
        </div>
    );
}

export default Radio;
