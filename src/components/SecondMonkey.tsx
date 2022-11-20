import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

const example =
    ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero mollitia autem veniam in iure!';

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

const useText = (text: string) => {
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

    const changeAddWord = (givenChar: string, idx: number) => {
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

    const chageDeleteWord = (idx: number) => {
        const newWord = currentWord.map((item) => {
            if (currentWord.indexOf(item) === idx) {
                return { text: item.text, correct: null } as wordObj;
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
        isError: false,
        changeWord: changeAddWord,
        currentWord,
        nextWord,
        chageDeleteWord,
    };
};

export const SecondMonkey = () => {
    // const [inputValue, setInputValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const { nextWord, changeWord, currentWord, chageDeleteWord } =
        useText(example);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space') {
            nextWord();
            setCurrentCharIndex(0);
        } else if (event.code === 'Backspace') {
            chageDeleteWord(currentCharIndex - 1);
            setCurrentCharIndex((prev) => prev - 1);
            // setInputValue((prev) => prev.slice(0, prev.length - 1));
        } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
            changeWord(event.key, currentCharIndex);
            setCurrentCharIndex((prev) => prev + 1);
            // setInputValue((prev) => prev + event.key);
        }
    };

    useEffect(() => {
        if (!divRef.current) return;

        divRef.current.focus();
    }, []);

    console.log(currentWord[0], currentWord[1]);

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
                        />
                    ))}
                </span>
            </div>
        </div>
    );
};
