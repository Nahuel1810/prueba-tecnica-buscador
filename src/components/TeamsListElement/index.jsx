import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../../components/Buttons/DefaultButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../../components/StarRating';
import { useNavigate } from 'react-router-dom';

export default function TeamsListElement({ equipo, isSelected, onCheckboxChange }) {
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        onCheckboxChange(equipo.id, !isSelected);
    };

    return (
        <>
            <div className={`flex flex-col px-4 border my-1 p-1 rounded-md bg-white mb-1 ${isSelected ? 'border-blue-400' : ''}`} onClick={handleCheckboxChange}>
                <div className='flex flex-row justify-between items-start'>
                    <div>
                        <h2 className='text-xl font-bold text-gray-700 p-1'>{equipo.nombre}</h2>
                        <p className='text-sm flex flex-row gap-1'><StarRating rating={equipo.valoracion} />({equipo.valoracion})</p>
                    </div>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5 mt-2"
                    />
                </div>
                <div className='flex justify-between items-start'>
                    <p className='text-sm font-bold text-gray-500 pt-1.5'>{equipo.tipo}</p>
                    <div className='w-2/5'>
                        <DefaultButton textColor="text-gray-700 hover:text-white" bgColor="bg-gray-200" onClick={() => navigate(`/equipo/${equipo.id}`)}>Ver más <FontAwesomeIcon icon={faEye} size='sm' /></DefaultButton>
                    </div>
                </div>
            </div>
        </>
    );
}

TeamsListElement.propTypes = {
    equipo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        valoracion: PropTypes.number.isRequired,
        tipo: PropTypes.string.isRequired
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onCheckboxChange: PropTypes.func.isRequired
};
