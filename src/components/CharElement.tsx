import React from 'react';

type CharElementProps = {
    char: string;
    isActive: boolean;
    correct: boolean | null;
};

export const CharElement = ({ char, correct, isActive }: CharElementProps) => {
    let color = '';
    if (correct === null) {
        color = '';
    } else if (correct === true) {
        color = 'text-white';
    } else {
        color = 'text-red-300';
    }
    return (
        <span className={`${color} ${isActive ? 'activeLetter' : ''}`}>
            {char}
        </span>
    );
};
