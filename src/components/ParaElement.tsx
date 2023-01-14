import React, { useRef, useState, KeyboardEvent, RefObject } from 'react';
import { wordObjType } from './SecondMonkey';
import { WordElement } from './WordElement';

type ParaElementProps = {
    resultList: wordObjType[][];
    leftList: wordObjType[][];
    currentWord: wordObjType[];
    currentCharIndex: number;
    divRef: RefObject<HTMLDivElement>;
    focusOnText: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export const ParaElement: React.FC<ParaElementProps> = ({
    resultList,
    currentWord,
    leftList,
    currentCharIndex,
    divRef,
    focusOnText,
    handleKeyDown,
}) => {
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
            className={`flex flex-wrap text-gray-400 text-3xl max-w-3xl gap-1 focus:outline-none ${
                isBlured ? 'blur-[2px] text-gray-500' : ''
            }`}
            tabIndex={0}
            ref={divRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
        >
            {resultList.map((item, index) => (
                <WordElement key={index} word={item} />
            ))}

            <WordElement
                word={currentWord}
                idx={currentCharIndex}
                isBlured={isBlured}
            />

            {leftList.map((item, index) => (
                <WordElement key={index} word={item} />
            ))}
        </div>
    );
};
