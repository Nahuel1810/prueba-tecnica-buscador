import React, { useState } from 'react';
import { usePlayers } from '../../../../contexts/PlayersContext';
import DefaultButton from '../../../Buttons/DefaultButton';
import Input from '../../../Inputs/DefaultInput';
import DefaultModal from '../../DefaultModal';
import StatusModal from '../../StatusModal';
import { validarPosicion } from '../../../../interfaces/Equipo'; // Importa la función de validación

export default function AddPlayer({ isOpen, handleClose }) {
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
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

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

        // Verificar que la posición ingresada sea válida
        if (!validarPosicion(playerData.posicion)) {
            setPlayerDataErrors({
                ...playerDataErrors,
                posicion: true
            });
            return;
        }

        const nuevoJugador = {
            nombre: playerData.nombre,
            posicion: playerData.posicion,
            descripcion: playerData.descripcion
        };
        setPlayers(prevPlayers => [...prevPlayers, nuevoJugador]);
        setIsSuccess(true);
        setStatusMessage('¡Jugador agregado correctamente!');
        setStatusModalOpen(true);
        setPlayerData({
            nombre: '',
            posicion: '',
            descripcion: ''
        });
    }

    return (
        <>
            <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar jugador'}>
                <p className='text-dark mt-5 mb-1 md:text-center'>Ingrese los datos a continuación</p>
                <div className='flex flex-col items-center justify-center'>
                    <Input
                        placeholder={'Nombre'}
                        value={playerData.nombre}
                        onChange={(e) => setPlayerData({ ...playerData, nombre: e.target.value })}
                        error={playerDataErrors.nombre}
                    />
                    <Input
                        placeholder={'Descripción'}
                        value={playerData.descripcion}
                        onChange={(e) => setPlayerData({ ...playerData, descripcion: e.target.value })}
                        error={playerDataErrors.descripcion}
                    />
                    <Input
                        placeholder={'Posición: Ej: Mediocampista'}
                        value={playerData.posicion}
                        onChange={(e) => setPlayerData({ ...playerData, posicion: e.target.value.toUpperCase() })}
                        error={playerDataErrors.posicion}
                    />
                    <div className='w-full md:w-80 mt-4'><DefaultButton onClick={handleSubmitPlayer}>Finalizar</DefaultButton></div>
                </div>
            </DefaultModal>
            <StatusModal isOpen={statusModalOpen} handleClose={() => setStatusModalOpen(false)} isSuccess={isSuccess} message={statusMessage} />
        </>
    );
}
