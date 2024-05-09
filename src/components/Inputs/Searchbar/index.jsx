import React from 'react';

export default function Searchbar({ value, onChange }) {
    return (
        <input
            className="rounded-lg w-full px-8 py-2 border focus:outline-none focus:border-accent placeholder-gray-400 transition-colors duration-300 "
            placeholder="Buscar..."
            required
            onChange={onChange}
            value={value}
            type="text"
        />
    );

}
