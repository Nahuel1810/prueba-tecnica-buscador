import React, { createContext, useContext, useState } from 'react';

const PlayersContext = createContext();
// Contexto para jugadores recien creados que no tienen equipo. 
// Luego al crear un equipo podemos elegir entre estos jugadores.

export const PlayersProvider = ({ children }) => {
    const initialPlayers = [
        { nombre: 'Nahuel', posicion: 'MEDIOCAMPISTA', descripcion: 'Veloz' },
        { nombre: 'Camila', posicion: 'DELANTERO', descripcion: 'Optimista del gol' },
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
