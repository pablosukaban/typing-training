import { wordObjType } from './SecondMonkey';
import React from 'react';
import { CharElement } from './CharElement';

type WordElementProps = {
    word: wordObjType[];
    idx?: number;
    isBlured?: boolean;
};

export const WordElement = ({ word, idx, isBlured }: WordElementProps) => {
    return (
        <span>
            {word.map((item, index) => (
                <CharElement
                    char={item.text}
                    correct={item.correct}
                    key={index}
                    isActive={idx === index && isBlured === false}
                />
            ))}{' '}
        </span>
    );
};
