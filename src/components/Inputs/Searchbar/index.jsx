import React from 'react';

export default function Searchbar({ value, onChange }) {
    return (
        <input
            className="rounded-lg w-full px-8 border focus:outline-none focus:border-blue-400 placeholder-gray-400 transition-colors duration-300 md:w-1/2"
            placeholder="Buscar..."
            required
            onChange={onChange}
            value={value}
            type="text"
        />
    );

}
