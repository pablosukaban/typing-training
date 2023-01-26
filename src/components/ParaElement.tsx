import React, { useState, KeyboardEvent, RefObject } from 'react';
import { WordObjType } from '../types';
import { WordElement } from './WordElement';

type ParaElementProps = {
    resultList: WordObjType[];
    leftList: WordObjType[];
    currentWord: WordObjType;
    currentCharIndex: number;
    containerRef: RefObject<HTMLDivElement>;
    focusOnText: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export const ParaElement = ({
    resultList,
    currentWord,
    leftList,
    currentCharIndex,
    containerRef,
    focusOnText,
    handleKeyDown,
}: ParaElementProps) => {
    const [isBlured, setIsBlured] = useState(false);

    const handleBlur = () => {
        setIsBlured(true);
    };

    const handleFocus = () => {
        setIsBlured(false);
        focusOnText();
    };

    return (
        <div
            className={`flex flex-wrap text-3xl px-16 gap-2 max-h-[124px] focus:outline-none overflow-hidden  ${
                isBlured ? 'blured-text' : 'visible-text'
            }`}
            tabIndex={0}
            ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
        >
            {resultList.map((item) => (
                <WordElement key={item.id} word={item.word} />
            ))}

            <WordElement
                word={currentWord.word}
                idx={currentCharIndex}
                isBlured={isBlured}
                isCurrent={true}
            />

            {leftList.map((item, index) => (
                <WordElement key={index} word={item.word} />
            ))}
        </div>
    );
};
