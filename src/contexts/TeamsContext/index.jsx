import React, { createContext, useContext, useEffect, useState } from 'react';
import data from '../../data';

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState(data.equipos);

    useEffect(() => {
        setTeams(data.equipos)
    }, [data.equipos])

    const getTeamById = (id) => {
        return teams.find(team => team.id === id);
    };

    const addTeam = (team) => {
        setTeams(prevTeams => [...prevTeams, team]);
    };

    const deleteTeam = (id) => {
        setTeams(prevTeams => prevTeams.filter(team => team.id !== id));
    };

    const deletePlayersFromTeam = (teamId, playerIndexes) => {
        if (!Array.isArray(playerIndexes)) {
            console.error('playerIndexes no es un array');
            return;
        }

        setTeams(prevTeams =>
            prevTeams.map(team => {
                if (team.id === teamId) {
                    team.jugadores = team.jugadores.filter((_, index) => !playerIndexes.includes(index));
                }
                return team;
            })
        );
    };

    return (
        <TeamsContext.Provider value={{ teams, setTeams, getTeamById, deleteTeam, addTeam, deletePlayersFromTeam }}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => useContext(TeamsContext);
