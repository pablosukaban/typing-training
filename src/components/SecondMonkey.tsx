import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';
import { WordElement } from './WordElement';

const longExample =
    'Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 ';

export type wordObjType = {
    text: string;
    correct: boolean | null;
};

const BASE_URL = 'https://fish-text.ru/';
const FORMAT = 'json';
const NUMBER = 1;
const PARAMS = `get?format=${FORMAT}&number=${NUMBER}`;

type ResponseJSONType = {
    status: string;
    text: string;
    errorCode?: string;
};

export const SecondMonkey = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [mainText, setMainText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const {
        currentWord,
        wordIndex,
        resultList,
        leftList,
        nextWord,
        changeAddWord,
        chageDeleteWord,
    } = useText(mainText);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const code = event.code;
        const key = event.key;

        if (code === 'Space') {
            if (currentWord.some((letter) => letter.correct === null)) return;
            if (wordIndex === mainText.split(' ').length - 1) return;
            nextWord();
            setCurrentCharIndex(0);
        } else if (code === 'Backspace') {
            chageDeleteWord(currentCharIndex - 1);
            setCurrentCharIndex((prev) => (prev === 0 ? prev : prev - 1));
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

    useEffect(() => {
        let ignore = false;

        const fetchText = async (url: string) => {
            const response = await fetch(url);
            const json: ResponseJSONType = await response.json();

            if (!ignore) {
                setMainText(json.text);
            }
        };

        fetchText(BASE_URL + PARAMS);

        return () => {
            ignore = true;
        };
    }, []);

    // console.log('result', resultList);
    // console.log('cur', currentWord);
    // console.log(leftList);

    // console.log(wordIndex);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-900 ">
            <div
                className="text-gray-400 text-3xl max-w-3xl focus:outline-none"
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
