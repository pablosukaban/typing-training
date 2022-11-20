import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';

const example = 'Немного здравого смысла';

export type wordObjType = {
    text: string;
    correct: boolean | null;
};

type CharElementProps = {
    char: string;
    isActive: boolean;
    correct: boolean | null;
};

const CharElement = ({ char, correct, isActive }: CharElementProps) => {
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

type WordElementProps = {
    word: wordObjType[];
    idx?: number;
};

const WordElement = ({ word, idx }: WordElementProps) => {
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

export const SecondMonkey = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isStrictMode, setIsStrictMode] = useState(true);

    const {
        nextWord,
        changeAddWord,
        currentWord,
        chageDeleteWord,
        resultList,
        leftList,
        wordIndex,
    } = useText(example, isStrictMode);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const code = event.code;
        const key = event.key;

        if (code === 'Space') {
            if (currentWord.some((letter) => letter.correct === null)) return;
            if (wordIndex === example.split(' ').length - 1) return;
            nextWord();
            setCurrentCharIndex(0);
        } else if (code === 'Backspace') {
            chageDeleteWord(currentCharIndex - 1);
            setCurrentCharIndex((prev) => prev - 1);
        } else if (key.length === 1 && key.match(/[а-я А-Я ,.?!"-;']/i)) {
            if (currentCharIndex >= currentWord.length) return;
            changeAddWord(event.key, currentCharIndex);
            setCurrentCharIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (!divRef.current) return;

        divRef.current.focus();
    }, []);

    // console.log(resultList);
    // console.log(currentWord);
    // console.log(leftList);

    console.log(wordIndex);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-900 ">
            <div
                className="text-gray-400 text-3xl max-w-6xl focus:outline-none"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={divRef}
            >
                {resultList.map((item, index) => (
                    <WordElement key={index} word={item} />
                ))}
                <WordElement word={currentWord} idx={currentCharIndex} />
                {leftList.map((item, index) => (
                    <WordElement key={index} word={item} />
                ))}
            </div>
        </div>
    );
};
