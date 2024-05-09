import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoccerBall, faStar } from '@fortawesome/free-solid-svg-icons';
import DefaultModal from '../DefaultModal';
import DefaultButton from '../../Buttons/DefaultButton';
import Radio from '../../Inputs/Radio';
import StarSelector from '../../Inputs/StarSelector';
import { useFilters } from '../../../contexts/FilterContext';

export default function FiltersModal({ isOpen, handleClose }) {
    const { filters, setFilters } = useFilters();
    const [showTypes, setShowTypes] = useState(false);
    const [showRating, setShowRating] = useState(false);

    const handleShowTypes = () => {
        setShowTypes(prevState => !prevState);
    };

    const handleShowRating = () => {
        setShowRating(prevState => !prevState);
    };

    const handleRating = (rating) => {
        setFilters(prevFilters => ({ ...prevFilters, minRating: rating }));
    }
    const handleClear = () => {
        setFilters({
            type: '',
            minRating: 0,
        });
    }

    const options = [
        { label: 'Fútbol 5', value: 'F5' },
        { label: 'Fútbol 7', value: 'F7' },
        { label: 'Fútbol 11', value: 'F11' },
    ];

    return (
        <>
            <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Filtros'}>
                <p className='text-dark mt-5 mb-1'>Filtrar la búsqueda por:</p>
                <div className='flex flex-col items-center justify-center mt-3'>

                    <div onClick={handleShowTypes} className={`flex flex-row justify-between items-center p-2 mt-1 bg-gray-100 w-full rounded font-bold shadow border cursor-pointer ${showTypes ? 'border-gray-400 bg-gray-300' : ''}`}>
                        <p>Tipos de juego</p>
                        <FontAwesomeIcon icon={faSoccerBall} />
                    </div>
                </div>
                {showTypes && <Radio options={options} />}

                <div onClick={handleShowRating} className={`flex flex-row justify-between items-center p-2 mt-1 bg-gray-100 w-full rounded font-bold shadow border cursor-pointer ${showRating ? 'border-gray-400 bg-gray-300' : ''}`}>
                    <p>Valoración mínima</p>
                    <FontAwesomeIcon icon={faStar} />
                </div>

                {showRating && <StarSelector rating={filters.minRating} handleRating={handleRating} />}

                <div className='flex flex-col items-center justify-center mt-6'>

                    <DefaultButton onClick={handleClear}>Limpiar filtros</DefaultButton>
                </div>
            </DefaultModal>
        </>
    );
}
