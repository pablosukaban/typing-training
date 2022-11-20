import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

const example =
    ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero mollitia autem veniam in iure!';

// * Меняю curerntWord? Нажмаю L,

type wordObj = {
    text: string;
    correct: boolean | null;
};

type CharElementProps = {
    char: string;
    correct: boolean | null;
};

const CharElement = ({ char, correct }: CharElementProps) => {
    let color = '';
    if (correct === null) {
        color = '';
    } else if (correct === true) {
        color = 'text-white';
    } else {
        color = 'text-red-300';
    }
    return <span className={`${color}`}>{char}</span>;
};

const useText = (text: string, inputValue: string) => {
    const wordList = text.split(' ').slice(1);
    const [charList, setCharList] = useState(
        wordList.map((word) =>
            word.split('').map((char) => {
                const newObj: wordObj = { text: char, correct: null };
                return newObj;
            })
        )
    );
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(charList[currentWordIndex]);

    const nextWord = () => {
        setCurrentWordIndex((prev) => prev + 1);
    };

    const changeWord = (givenChar: string, idx: number) => {
        const newWord = currentWord.map((item) => {
            if (currentWord.indexOf(item) === idx) {
                if (item.text === givenChar) {
                    return { text: item.text, correct: true } as wordObj;
                } else {
                    return { text: item.text, correct: false } as wordObj;
                }
            } else {
                return item;
            }
        });
        setCurrentWord(newWord);
    };

    useEffect(() => {
        setCurrentWord(charList[currentWordIndex]);
    }, [currentWordIndex]);

    return {
        wordList,
        nextWord,
        isError: false,
        changeWord,
        currentWord,
    };
};

export const SecondMonkey = () => {
    const [inputValue, setInputValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const { isError, nextWord, wordList, changeWord, currentWord } = useText(
        example,
        inputValue
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key.length > 1) return;

        if (event.key === 'Backspace') {
            setInputValue((prev) => prev.slice(1));
            setCurrentWordIndex((prev) => prev - 1);
        } else if (event.code === 'Space') {
            nextWord();
            setCurrentWordIndex(0);
        } else {
            changeWord(event.key, currentWordIndex);
            setCurrentWordIndex((prev) => prev + 1);
        }
        setInputValue((prev) => prev + event.key);
    };

    useEffect(() => {
        if (!divRef.current) return;

        divRef.current.focus();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-900 ">
            <div
                className="text-gray-300 text-3xl max-w-6xl focus:outline-none"
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
                <h2>
                    {currentWord.map((item, index) => (
                        <CharElement
                            key={index}
                            char={item.text}
                            correct={item.correct}
                        />
                    ))}
                </h2>
            </div>
        </div>
    );
};
