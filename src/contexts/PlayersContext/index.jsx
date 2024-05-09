import React, { createContext, useContext, useState } from 'react';

const PlayersContext = createContext();
// Contexto para jugadores recien creados que no tienen equipo. 
// Luego al crear un equipo podemos elegir entre estos jugadores.

export const PlayersProvider = ({ children }) => {
    const initialPlayers = [
        { nombre: 'Nahuel', posicion: 'MC', descripcion: 'crack' },
        { nombre: 'María', posicion: 'DFC', descripcion: 'rápida' },
    ];
    const [players, setPlayers] = useState(initialPlayers);

    const getPlayerByPosition = (pos) => {
        return players[pos];
    };

    return (
        <PlayersContext.Provider value={{ players, setPlayers, getPlayerByPosition }}>
            {children}
        </PlayersContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayersContext);
