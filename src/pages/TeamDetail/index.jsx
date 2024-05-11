import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeams } from '../../contexts/TeamsContext';
import StarRating from '../../components/StarRating'
import DefaultButton from '../../components/Buttons/DefaultButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faFaceSadTear, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../components/Modals/DeleteModal';

export default function TeamDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getTeamById } = useTeams();
    const team = getTeamById(parseInt(id));
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [hasSelectedPlayers, setHasSelectedPlayers] = useState(false);

    const handleModalDelete = () => setDeleteModal(prevState => !prevState);
    const handleUpdateSelectedPlayers = (updatedSelectedPlayers) => {
        setSelectedPlayers(updatedSelectedPlayers);
    };
    const handlePlayerSelect = (index) => {
        const isSelected = selectedPlayers.includes(index);
        if (isSelected) {
            setSelectedPlayers(selectedPlayers.filter(item => item !== index));
        } else {
            setSelectedPlayers([...selectedPlayers, index]);
        }
    };

    useEffect(() => {
        if (selectedPlayers.length > 0) {
            setHasSelectedPlayers(true);
        } else {
            setHasSelectedPlayers(false);
        }
    }, [selectedPlayers]);

    useEffect(() => {
        setSelectedPlayers([]);
        setHasSelectedPlayers(false);
    }, [team]);

    return (
        <>
            <div className='bg-gradient-to-r from-emerald-500 to-emerald-700 to-90% w-full h-auto pb-7'>
                <div>
                    <FontAwesomeIcon icon={faChevronCircleLeft} className='cursor-pointer text-white/50 pl-4 pt-4 hover:text-white' size='2xl' onClick={() => navigate('/')} />
                </div>

                <h1 className="text-white text-4xl text-center font-bold mb-3">{team.nombre}</h1>
                <p className='flex flex-row gap-1 justify-center items-start text-white'>Valoración: <StarRating rating={team.valoracion} />({team.valoracion})</p>
                <p className=' text-center text-white'>Tipo de juego: {team.tipo}</p>
            </div>

            <div key={team.id} className='flex flex-col gap-5 justify-center items-center md:px-10 md:mt-2'>
                <div className='px-4 py-2 md:w-2/3'>
                    <div className='bg-white rounded-md w-full p-4 mt-2 shadow border-t'>
                        <div className='flex flex-row w-full justify-between items-end gap-2'>
                            <p className='text-lg text-gray-700 font-bold'>Lista de jugadores:</p>
                            <div>
                                <DefaultButton onClick={handleModalDelete} bgColor="bg-error/70 border hover:bg-error" textColor="text-white" disabled={!(hasSelectedPlayers)}>
                                    <span className='flex flex-row justify-between items-center gap-3'>
                                        <p>Borrar</p>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </DefaultButton>
                            </div>
                        </div>

                        {team.jugadores.length > 0 ?
                            (team.jugadores.map((jugador, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePlayerSelect(index)}
                                    className={`flex flex-col justify-center bg-gray-50 my-2 mx-2 px-2 pb-2 text-gray-600 rounded-md cursor-pointer border  ${selectedPlayers.includes(index) ? 'border-blue-400' : ''}`}
                                >
                                    <div className='flex flex-row justify-between'>
                                        <h2 className='text-lg font-semibold pt-2 '>{jugador.nombre}</h2>
                                        <input
                                            type="checkbox"
                                            checked={selectedPlayers.includes(index)}
                                            onChange={() => handlePlayerSelect(index)}
                                            className="w-5 h-5 mt-2"
                                        />
                                    </div>
                                    <p> {jugador.posicion}</p>
                                    <p className='text-gray-400'> {jugador.descripcion}</p>
                                </div>
                            ))) :
                            <div className='flex flex-col mt-2 px-4 pb-4 border rounded-md bg-white md:w-full'>
                                <p className='text-lg text-gray-500 text-center mt-5'>No hay jugadores que mostrar</p>
                                <FontAwesomeIcon icon={faFaceSadTear} className='text-gray-300 mt-2' size='3x' />
                            </div>
                        }
                    </div>
                </div>
            </div >
            <DeleteModal onUpdateSelectedPlayers={handleUpdateSelectedPlayers} isOpen={deleteModal} handleClose={handleModalDelete} entitiesId={[selectedPlayers, id]} typeOfModal={2} />
        </>
    );
}
