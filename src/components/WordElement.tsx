import React, { RefObject, useEffect, useRef } from 'react';
import { LetterObjType } from '../types';
import { CharElement } from './CharElement';

type WordElementProps = {
    word: LetterObjType[];
    idx?: number;
    isBlured?: boolean;
    isCurrent?: boolean;
    containerRef?: RefObject<HTMLDivElement>;
};

export const WordElement = ({ word, idx, isBlured }: WordElementProps) => {
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

    useEffect(() => {
        if (wordRef.current) {
            // const newSpanObj: SpanObjType = { idx: idx, span: wordRef.current };
            // addHtmlWord(newSpanObj);
        }
    }, []);

    return (
        <span ref={wordRef}>
            {word.map((item, index) => (
                <CharElement
                    char={item.letter}
                    correct={item.correct}
                    key={index}
                    isActive={idx === index && isBlured === false}
                />
            ))}{' '}
        </span>
    );
};
