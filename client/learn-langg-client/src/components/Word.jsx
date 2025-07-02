import React from 'react';
import './Word.css';

const Word = ({ word, onClick, selected }) => {
    return (
        <span
            className={`word${selected ? ' selected' : ''}`}
            onClick={onClick}
        >
            {word}
        </span>
    );
};

export default Word;