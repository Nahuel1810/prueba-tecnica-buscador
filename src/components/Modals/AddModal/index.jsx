import React, { useEffect, useState } from 'react';
import DefaultModal from '../DefaultModal';
import DefaultButton from '../../Buttons/DefaultButton';
import Input from '../../Inputs/DefaultInput';
import SelectPlayers from '../../Inputs/SelectPlayers';
import { usePlayers } from '../../../contexts/PlayersContext';
import { useTeams } from '../../../contexts/TeamsContext';
import { validarPosicion } from '../../../interfaces/Equipo';

export default function AddModal({ isOpen, handleClose }) {
    const [typeOfModal, setTypeOfModal] = useState(undefined);
    const { addTeam, teams } = useTeams();
    const { players, setPlayers } = usePlayers();
    const [playerData, setPlayerData] = useState({
        nombre: '',
        posicion: '',
        descripcion: ''
    });
    const [playerDataErrors, setPlayerDataErrors] = useState({
        nombre: false,
        posicion: false,
        descripcion: false
    });


    const generateUniqueID = () => {
        const lastID = teams.length > 0 ? teams[teams.length - 1].id : 0;
        return lastID + 1;
    };

    const [teamData, setTeamData] = useState({
        nombreEquipo: '',
        tipoJuego: '',
        valoracion: '',
        jugadores: []
    });
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamDataErrors, setTeamDataErrors] = useState({
        nombreEquipo: false,
        tipoJuego: false,
        valoracion: false,
    });

    // Función para actualizar el estado local de los jugadores seleccionados
    const handleSelectedPlayersChange = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };


    function handleSubmitPlayer() {
        // Verificar que los campos no estén vacíos
        if (!playerData.nombre || !playerData.posicion || !playerData.descripcion) {
            setPlayerDataErrors({
                nombre: !playerData.nombre,
                posicion: !playerData.posicion,
                descripcion: !playerData.descripcion
            });
            return;
        }

        // Verificar que la posición ingresada sea válida  !!!!!!!!!!!
        if (validarPosicion(playerData.posicion) === false) {
            setPlayerDataErrors({
                posicion: true,
            });
        }

        const nuevoJugador = {
            nombre: playerData.nombre,
            posicion: playerData.posicion,
            descripcion: playerData.descripcion
        };
        setPlayers(prevPlayers => [...prevPlayers, nuevoJugador]);
        handleClose();
    }

    function handleSubmitTeam() {
        // Verificar que los campos no estén vacíos
        if (!teamData.nombreEquipo || !teamData.tipoJuego || !teamData.valoracion) {
            setTeamDataErrors({
                nombreEquipo: !teamData.nombreEquipo,
                tipoJuego: !teamData.tipoJuego,
                valoracion: !teamData.valoracion,
            });
            return;
        }

        // Verificar que la valoración sea un número válido
        const valoracion = parseFloat(teamData.valoracion);
        if (isNaN(valoracion) || valoracion < 0) {
            setTeamDataErrors({
                ...teamDataErrors,
                valoracion: true,
            });
            return;
        }

        const newTeam = {
            id: generateUniqueID(), // Generar una ID única para el nuevo equipo
            nombre: teamData.nombreEquipo,
            tipo: teamData.tipoJuego,
            valoracion: valoracion,
            jugadores: selectedPlayers.map(index => players[index]) // Asignar los jugadores seleccionados al equipo
        };

        addTeam(newTeam);

        const updatedPlayers = players.filter((player, index) => !selectedPlayers.includes(index));
        setPlayers(updatedPlayers);
        handleClose();
    }
    useEffect(() => {
        if (isOpen === false) {
            setTeamData({
                nombreEquipo: '',
                tipoJuego: '',
                valoracion: '',
            });
            setTeamDataErrors({
                nombreEquipo: false,
                tipoJuego: false,
                valoracion: false,
            });
            setSelectedPlayers([]);
            setTypeOfModal(null)
        }
    }, [isOpen]);

    return (
        <>
            {typeOfModal === 1 ? (
                <>
                    <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar jugador'}>
                        <p className='text-dark mt-5 mb-1'>Ingrese los datos a continuación</p>
                        <div className='flex flex-col items-center justify-center'>
                            <Input
                                placeholder={'Nombre'}
                                value={playerData.nombre}
                                onChange={(e) => setPlayerData({ ...playerData, nombre: e.target.value })}
                                error={playerDataErrors.nombre}
                            />
                            <Input
                                placeholder={'Posición'}
                                value={playerData.posicion}
                                onChange={(e) => setPlayerData({ ...playerData, posicion: e.target.value })}
                                error={playerDataErrors.posicion}
                            />
                            <Input
                                placeholder={'Descripción'}
                                value={playerData.descripcion}
                                onChange={(e) => setPlayerData({ ...playerData, descripcion: e.target.value })}
                                error={playerDataErrors.descripcion}
                            />
                            <DefaultButton onClick={handleSubmitPlayer}>Finalizar</DefaultButton>
                        </div>
                    </DefaultModal>
                </>
            ) : typeOfModal === 2 ? (
                <>
                    <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar equipo'}>
                        <p className='text-dark mt-5 mb-1'>Ingrese los datos a continuación</p>
                        <div className='flex flex-col items-center justify-center'>
                            <Input
                                placeholder={'Nombre del equipo'}
                                value={teamData.nombreEquipo}
                                onChange={(e) => setTeamData({ ...teamData, nombreEquipo: e.target.value })}
                                error={teamDataErrors.nombreEquipo}
                            />
                            <Input
                                placeholder={'Tipo de juego'}
                                value={teamData.tipoJuego}
                                onChange={(e) => setTeamData({ ...teamData, tipoJuego: e.target.value })}
                                error={teamDataErrors.tipoJuego}
                            />
                            <Input
                                placeholder={'Valoración'}
                                value={teamData.valoracion}
                                onChange={(e) => setTeamData({ ...teamData, valoracion: e.target.value })}
                                error={teamDataErrors.valoracion}
                            />
                            <SelectPlayers onSelectionChange={handleSelectedPlayersChange} />
                            <DefaultButton onClick={handleSubmitTeam}>Finalizar</DefaultButton>
                        </div>
                    </DefaultModal>
                </>
            ) : (
                <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar'}>
                    <p className='text-dark mt-5 mb-1'>¿Qué desea agregar al sistema?</p>
                    <div className='flex flex-col items-center justify-center'>
                        <DefaultButton onClick={() => setTypeOfModal(1)}>Un jugador</DefaultButton> {/* Agrega onClick para cambiar el tipo de modal */}
                        <DefaultButton onClick={() => setTypeOfModal(2)}>Un equipo</DefaultButton> {/* Agrega onClick para cambiar el tipo de modal */}
                    </div>
                </DefaultModal>
            )
            }
        </>
    );
}
