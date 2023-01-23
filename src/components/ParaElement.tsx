import React, { useState, KeyboardEvent, RefObject } from 'react';
import { wordObjType } from './SecondMonkey';
import { WordElement } from './WordElement';

type ParaElementProps = {
    resultList: wordObjType[][];
    leftList: wordObjType[][];
    currentWord: wordObjType[];
    currentCharIndex: number;
    containerRef: RefObject<HTMLDivElement>;
    focusOnText: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    handleWordClick: (element: HTMLElement) => void;
};

export const ParaElement = ({
    resultList,
    currentWord,
    leftList,
    currentCharIndex,
    containerRef,
    focusOnText,
    handleKeyDown,
    handleWordClick,
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
            {resultList.map((item, index) => (
                <WordElement
                    key={index}
                    word={item}
                    handleWordClick={handleWordClick}
                />
            ))}

            <WordElement
                word={currentWord}
                idx={currentCharIndex}
                isBlured={isBlured}
                isCurrent={true}
                handleWordClick={handleWordClick}
            />

            {leftList.map((item, index) => (
                <WordElement
                    key={index}
                    word={item}
                    handleWordClick={handleWordClick}
                />
            ))}
        </div>
    );
};
