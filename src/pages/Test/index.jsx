import React, { useState } from 'react';
import DefaultButton from '../../components/Buttons/DefaultButton';


export default function Test() {
    const [open, setOpen] = useState(false);

    const handleCloseAddModal = () => setOpen(prevState => !prevState);
    return (
        <>
            <DefaultButton onClick={handleCloseAddModal}>Abrir</DefaultButton>

        </>
    );
}