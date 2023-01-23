import { wordObjType } from './SecondMonkey';
import React, { RefObject, useEffect, useRef } from 'react';
import { CharElement } from './CharElement';

type WordElementProps = {
    word: wordObjType[];
    idx?: number;
    isBlured?: boolean;
    isCurrent?: boolean;
    containerRef?: RefObject<HTMLDivElement>;
    handleWordClick: (element: HTMLElement) => void;
};

export const WordElement = ({
    word,
    idx,
    isBlured,
    isCurrent,
    containerRef,
    handleWordClick,
}: WordElementProps) => {
    const wordRef = useRef<HTMLSpanElement>(null);

    // if (isCurrent && wordRef.current) {
    //     const coords = wordRef.current.getBoundingClientRect();
    //     console.log(coords);
    // }

    // const handleClick = () => {
    //     if (wordRef.current) {
    //         handleWordClick(wordRef.current);
    //     }
    // };

    // if (wordRef.current) {
    //     handleWordClick(wordRef.current);
    // }

    return (
        <span ref={wordRef}>
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
