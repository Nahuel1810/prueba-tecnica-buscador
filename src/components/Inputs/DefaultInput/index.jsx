import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, placeholder, value, onChange, error }) {

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 hover:border-gray-400 rounded-md px-4 py-2 my-1 focus:outline-none focus:border-accent bg-white text-dark shadow cursor-pointer focus:scale-105 transition-transform duration-75 ${error ? 'border-red-500' : ''}`}
        />
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'number']),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
    type: 'text',
};


