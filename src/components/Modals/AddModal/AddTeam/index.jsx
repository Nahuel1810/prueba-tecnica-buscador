import React, { useEffect, useState } from 'react';
import { usePlayers } from '../../../../contexts/PlayersContext';
import { useTeams } from '../../../../contexts/TeamsContext';
import DefaultButton from '../../../Buttons/DefaultButton';
import Input from '../../../Inputs/DefaultInput';
import SelectPlayers from '../../../Inputs/SelectPlayers';
import DefaultModal from '../../DefaultModal';
import StatusModal from '../../StatusModal';
import { validarTipoDeJuego } from '../../../../interfaces/Equipo';

export default function AddTeam({ isOpen, handleClose }) {
    const { addTeam, teams } = useTeams();
    const { players, setPlayers } = usePlayers();
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamData, setTeamData] = useState({
        nombreEquipo: '',
        tipoJuego: '',
        valoracion: '',
        jugadores: []
    });
    const [teamDataErrors, setTeamDataErrors] = useState({
        nombreEquipo: false,
        tipoJuego: false,
        valoracion: false,
        jugadores: false,
    });
    const generateUniqueID = () => {
        const lastID = teams.length > 0 ? teams[teams.length - 1].id : 0;
        return lastID + 1;
    };

    const handleSelectedPlayersChange = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };

    function handleSubmitTeam() {
        // Verifica que los campos no estén vacíos
        if (!teamData.nombreEquipo || !teamData.tipoJuego || !teamData.valoracion) {
            setTeamDataErrors({
                nombreEquipo: !teamData.nombreEquipo,
                tipoJuego: !teamData.tipoJuego,
                valoracion: !teamData.valoracion,
            });
            return;
        }
        // Verifica que el tipo de juego sea F5, F7 o F11
        if (!validarTipoDeJuego(teamData.tipoJuego)) {
            setTeamDataErrors({
                ...teamDataErrors,
                tipoJuego: true,
            });
            return;
        }

        // Verifica que la valoración sea un número válido
        const valoracion = parseFloat(teamData.valoracion.replace(',', '.'));
        if (isNaN(valoracion) || valoracion < 0 || valoracion > 5) {
            setTeamDataErrors({
                ...teamDataErrors,
                valoracion: true,
            });
            return;
        }

        if (!selectedPlayers.length > 0) {
            setTeamDataErrors({
                ...teamDataErrors,
                jugadores: true,
            });
            return;
        }

        const newTeam = {
            id: generateUniqueID(),
            nombre: teamData.nombreEquipo,
            tipo: teamData.tipoJuego,
            valoracion: valoracion,
            jugadores: selectedPlayers.map(index => players[index])
        };
        addTeam(newTeam);
        setIsSuccess(true);
        setStatusMessage('Equipo agregado correctamente!');
        setStatusModalOpen(true);

        // Borrar jugadores de contexto al agregarse a equipo
        const updatedPlayers = players.filter((player, index) => !selectedPlayers.includes(index));
        setPlayers(updatedPlayers);
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
        }
    }, [isOpen]);

    return (
        <>
            <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar equipo'}>
                <p className='text-dark mt-5 mb-1 md:text-center'>Ingrese los datos a continuación</p>
                <div className='flex flex-col items-center justify-center'>
                    <Input
                        placeholder={'Nombre del equipo'}
                        value={teamData.nombreEquipo}
                        onChange={(e) => setTeamData({ ...teamData, nombreEquipo: e.target.value })}
                        error={teamDataErrors.nombreEquipo}
                    />
                    <Input
                        placeholder={'Tipo de juego: (F5, F7, F11)'}
                        value={teamData.tipoJuego}
                        onChange={(e) => setTeamData({ ...teamData, tipoJuego: e.target.value.toUpperCase() })}
                        error={teamDataErrors.tipoJuego}
                    />
                    <Input
                        placeholder={'Valoración: (1-5)'}
                        value={teamData.valoracion}
                        onChange={(e) => setTeamData({ ...teamData, valoracion: e.target.value })}
                        error={teamDataErrors.valoracion}
                    />
                    <SelectPlayers onSelectionChange={handleSelectedPlayersChange} error={teamDataErrors.jugadores} />
                    <div className='w-full md:w-80'>
                        <DefaultButton onClick={handleSubmitTeam}>Finalizar</DefaultButton>
                    </div>

                </div>
            </DefaultModal>
            <StatusModal isOpen={statusModalOpen} handleClose={() => setStatusModalOpen(false)} isSuccess={isSuccess} message={statusMessage} />
        </>
    );
}
