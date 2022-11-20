import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';

const example =
    ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero mollitia autem veniam in iure!';

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
        <span className={`${color} ${isActive && 'activeLetter'}`}>{char}</span>
    );
};

export const SecondMonkey = () => {
    // const [inputValue, setInputValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isStrictMode, setIsStrictMode] = useState(false);

    const { nextWord, changeWord, currentWord, chageDeleteWord } = useText(
        example,
        isStrictMode
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const code = event.code;
        const key = event.key;

        if (code === 'Space') {
            nextWord();
            setCurrentCharIndex(0);
        } else if (code === 'Backspace') {
            chageDeleteWord(currentCharIndex - 1);
            setCurrentCharIndex((prev) => prev - 1);
            // setInputValue((prev) => prev.slice(0, prev.length - 1));
        } else if (key.length === 1 && key.match(/[a-z]/i)) {
            changeWord(event.key, currentCharIndex);
            setCurrentCharIndex((prev) => prev + 1);
            // setInputValue((prev) => prev + event.key);
        }
    };

    useEffect(() => {
        if (!divRef.current) return;

        divRef.current.focus();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-900 ">
            <div
                className="text-gray-400 text-3xl max-w-6xl focus:outline-none"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={divRef}
            >
                {/* <p className={`text-2xl ${isError && 'text-red-400'}`}>
                    <span className="text-indigo-300"></span>

                    {wordList.map((item, index) => (
                        <span key={index}>{item} </span>
                    ))}
                </p> */}
                <span>
                    {currentWord.map((item, index) => (
                        <CharElement
                            key={index}
                            char={item.text}
                            correct={item.correct}
                            isActive={index === currentCharIndex}
                        />
                    ))}
                </span>
            </div>
        </div>
    );
};
