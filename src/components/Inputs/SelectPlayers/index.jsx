import React, { useState, useEffect } from 'react';
import { usePlayers } from '../../../contexts/PlayersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function SelectPlayers({ onSelectionChange, error }) {
    const [displayOptions, setDisplayOptions] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const { players } = usePlayers();

    useEffect(() => {
        onSelectionChange(selectedPlayers);
    }, [selectedPlayers, onSelectionChange]);

    const handleDisplayOptions = () => {
        setDisplayOptions(prevState => !prevState);
    };

    const handlePlayerSelect = (index) => {
        const isSelected = selectedPlayers.includes(index);
        if (isSelected) {
            setSelectedPlayers(selectedPlayers.filter(item => item !== index));
        } else {
            setSelectedPlayers([...selectedPlayers, index]);
        }
    };

    const isSelected = (index) => selectedPlayers.includes(index);

    return (
        <>
            <div
                className={`w-full h-10 flex flex-row justify-between items-center border border-gray-300 hover:border-gray-400 rounded-md px-4 my-1 shadow cursor-pointer transition-all duration-75 md:w-80 mb-2 md:shadow-none ${displayOptions ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold' : 'text-gray-400 bg-white'} ${error ? 'border-red-500' : ''}`}
                onClick={handleDisplayOptions}
            >
                <p>Elige los jugadores</p>
                <FontAwesomeIcon icon={displayOptions ? faChevronUp : faChevronDown} />
            </div>

            {displayOptions && players.length > 0 && (
                <>
                    <div className="border shadow w-full rounded-md px-2 mb-2 md:w-80 md:p-2 cursor-pointer bg-gray-50">
                        {players.map((jugador, index) => (
                            <div
                                key={index}
                                className={`rounded flex flex-row gap-5 justify-between px-2 py-2 my-2 w-full border transition-colors duration-75 ${isSelected(index) ? 'bg-blue-100 border border-blue-400 border-b-blue-400' : ''}`}
                                onClick={() => handlePlayerSelect(index)}
                            >
                                <p className='text-dark font-semibold'>{jugador.nombre}</p>
                                <p className='text-gray-600'>{jugador.posicion}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
