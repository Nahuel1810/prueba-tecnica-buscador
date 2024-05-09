import React, { useEffect, useState } from 'react';
import DefaultButton from '../../Buttons/DefaultButton';
import DefaultModal from '../DefaultModal';
import AddPlayer from './AddPlayer';
import AddTeam from './AddTeam';

export default function AddModal({ isOpen, handleClose }) {
    const [typeOfModal, setTypeOfModal] = useState(undefined);

    useEffect(() => {
        if (isOpen === false) {
            setTypeOfModal(null)
        }
    }, [isOpen]);
    return (
        <>
            {typeOfModal === 1 ? (
                <>
                    <AddPlayer isOpen={isOpen} handleClose={handleClose} />
                </>
            ) : typeOfModal === 2 ? (
                <>
                    <AddTeam isOpen={isOpen} handleClose={handleClose} />
                </>
            ) : (
                <DefaultModal isOpen={isOpen} onClose={handleClose} title={'Agregar'}>
                    <p className='text-dark mt-5 mb-1 md:ml-10'>¿Qué desea agregar al sistema?</p>
                    <div className='flex flex-col items-center justify-center gap-2 md:px-10'>
                        <DefaultButton onClick={() => setTypeOfModal(1)}>Un jugador</DefaultButton>
                        <DefaultButton onClick={() => setTypeOfModal(2)}>Un equipo</DefaultButton>
                    </div>
                </DefaultModal>
            )
            }
        </>
    );
}
