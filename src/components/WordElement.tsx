import { wordObjType } from './SecondMonkey';
import React from 'react';
import { CharElement } from './CharElement';

type WordElementProps = {
    word: wordObjType[];
    idx?: number;
};

export const WordElement = ({ word, idx }: WordElementProps) => {
    return (
        <span>
            {word.map((item, index) => (
                <CharElement
                    char={item.text}
                    correct={item.correct}
                    key={index}
                    isActive={idx === index}
                />
            ))}{' '}
        </span>
    );
};
