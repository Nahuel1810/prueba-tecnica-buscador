import React, { useEffect, useState } from 'react';
import DefaultModal from '../DefaultModal';
import DefaultButton from '../../Buttons/DefaultButton';
import { useTeams } from '../../../contexts/TeamsContext';

export default function DeleteModal({ isOpen, handleClose, entitiesId, typeOfModal, onUpdateSelectedPlayers }) {
    const { deleteTeam, getTeamById, deletePlayersFromTeam } = useTeams();
    const [teamsToDelete, setTeamsToDelete] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const uniqueIds = [...new Set(entitiesId)];
            const teams = await Promise.all(uniqueIds.map(id => getTeamById(id)));
            setTeamsToDelete(teams.filter(Boolean));
        };
        fetchTeams();
    }, [entitiesId, getTeamById]);

    function handleDeleteTeams() {
        teamsToDelete.forEach(team => deleteTeam(team.id));
        handleClose();
    }

    function handleDeletePlayers() {
        if (entitiesId.length > 0) {
            deletePlayersFromTeam(parseInt(entitiesId[1]), entitiesId[0]);
            handleClose();
            onUpdateSelectedPlayers([]);
        }
    }

    return (
        <>
            {typeOfModal === 1 ? (
                <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Borrar equipo'}>
                    <p className='text-gray-700 text-lg text-center font-bold italic mt-5'>¿Estás seguro?</p>
                    <p className='text-gray-600  mb-1'>Estás a punto de borrar los siguientes equipos:</p>
                    <ul className="font-bold text-error text-lg mt-2 mb-4 italic">
                        {teamsToDelete.map(team => (
                            <li key={team.id}>{team.nombre}</li>
                        ))}
                    </ul>
                    <div className='flex flex-col items-center justify-center '>
                        <DefaultButton onClick={handleDeleteTeams} bgColor="bg-error">Confirmar borrado</DefaultButton>
                    </div>
                </DefaultModal>
            ) :
                <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Borrar jugador'}>
                    <p className='text-gray-700 text-lg text-center font-bold italic my-5'>¿Estás seguro de borrar?</p>
                    <div className='flex flex-col items-center justify-center '>
                        <DefaultButton onClick={handleDeletePlayers} bgColor="bg-error">Confirmar</DefaultButton>
                    </div>
                </DefaultModal>
            }
        </>
    );
}
