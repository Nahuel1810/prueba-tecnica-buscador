import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DefaultModal from '../DefaultModal';
import DefaultButton from '../../Buttons/DefaultButton';

export default function StatusModal({ isOpen, handleClose, isSuccess, message }) {
    return (
        <DefaultModal isOpen={isOpen} onClose={handleClose} title={isSuccess ? 'Éxito' : 'Error'}>
            <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={isSuccess ? faCheckCircle : faTimesCircle} className={isSuccess ? 'text-primary' : 'text-error'} size="5x" />
            </div>
            <p className="text-center text-lg mt-4">{message}</p>
            <div className='flex flex-col items-center justify-center mt-6'>
                <DefaultButton onClick={handleClose}>Cerrar</DefaultButton>
            </div>
        </DefaultModal>
    );
}
