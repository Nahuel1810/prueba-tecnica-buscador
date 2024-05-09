import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';

export default function Modal({ isOpen, onClose, children, title }) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-accent bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg min-w-64 max-w-80">
                        <div className='flex flex-row justify-between items-bottom mb-2'>
                            <h3 className='text-gray-800 text-2xl font-bold'>{title}</h3>
                            <button data-tooltip-id="tooltip-cerrar" data-tooltip-content="Cerrar" className="flex justify-center items-center bg-white text-gray-500 border border-gray-500 hover:bg-error hover:border-error hover:text-white rounded-full p-2 h-8 w-8 duration-300 shadow-md" onClick={onClose}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <Tooltip id="tooltip-cerrar" className='rounded-md font-semibold' />
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};
