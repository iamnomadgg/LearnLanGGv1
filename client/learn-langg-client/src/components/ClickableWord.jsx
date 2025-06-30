import React from 'react';
import './ClickableWord.css';

const ClickableWord = ({ word, onClick, selected }) => {
    return (
        <span
            className={`clickable-word${selected ? ' selected' : ''}`}
            onClick={onClick}
        >
            {word}
        </span>
    );
};

export default ClickableWord;