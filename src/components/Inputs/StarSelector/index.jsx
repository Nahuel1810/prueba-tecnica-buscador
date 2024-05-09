import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';

export default function StarSelector({ rating, handleRating }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const handleHover = (hoveredRating) => {
        setHoveredRating(hoveredRating);
    };
    const clearHover = () => {
        setHoveredRating(0);
    };
    const handleClick = (clickedRating) => {
        handleRating(clickedRating);
    };
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={clearHover}
                onClick={() => handleClick(i)}
            >
                {i <= (hoveredRating || rating) ? (
                    <FontAwesomeIcon icon={solidStar} className="text-yellow-500" />
                ) : (
                    <FontAwesomeIcon icon={regularStar} className="text-gray-500" />
                )}
            </span>
        );
    }

    return (
        <div className="flex flex-row justify-center items-center p-2 border bg-gray-100 rounded">
            {stars}
        </div>
    );
}
