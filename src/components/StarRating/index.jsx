import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalf, faStar } from '@fortawesome/free-solid-svg-icons';

export default function StarRating({ rating }) {
    const integerPart = Math.floor(rating);
    const decimalPart = rating - integerPart;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < integerPart; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className='text-amber-500' />);
        }

        if (decimalPart > 0.25) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} className='text-amber-500' />);
        }

        return stars;
    };

    return (
        <>
            {renderStars()}
        </>
    );
}
