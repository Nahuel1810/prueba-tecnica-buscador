import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        type: null,
        minRating: 0,
    });

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};
