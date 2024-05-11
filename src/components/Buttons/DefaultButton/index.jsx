import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultButton({ children, onClick, textColor, bgColor, disabled }) {
    if (disabled) {
        return (
            <button
                className={`btn bg-gray-200 text-gray-400 cursor-not-allowed w-full hover:bg-gray-300 border border-transparent`}
                disabled={true}
            >
                {children}
            </button>
        );
    } else {
        return (
            <button
                className={`btn ${textColor ? textColor : 'text-white'} ${bgColor ? bgColor : 'bg-primary hover:bg-gradient-to-r from-primary to-70% to-accent'} w-full `}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

DefaultButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    disabled: PropTypes.bool,
};
