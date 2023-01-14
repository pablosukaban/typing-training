import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';
import { ParaElement } from './ParaElement';

// const longExample =
//     'Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 Немного здравого смысла не помешает прям щас 123 435 ';

// какой нить параграфКомпонент, в который все слова передавать и он сам будет отслеживать че выводить, нужно по идее просто очищать resultList, мб отслеживать высоту

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
    const [mainText, setMainText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    const {
        currentWord,
        wordIndex,
        resultList,
        leftList,
        nextWord,
        restartWord,
        changeAddWord,
        chageDeleteWord,
    } = useText(mainText);

    const fetchText2 = async (url: string): Promise<ResponseJSONType> => {
        const response = await fetch(url);
        return await response.json();
    };

    const handleRestart = async () => {
        const result = await fetchText2(BASE_URL + PARAMS);

        setMainText(result.text);

        setCurrentCharIndex(0);
        restartWord();
        focusOnText();

        setIsStarted(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const code = event.code;
        const key = event.key;

        if (code === 'Space') {
            if (currentWord.some((letter) => letter.correct === null)) return;
            if (wordIndex === mainText.split(' ').length - 1) {
                handleRestart();
                return;
            }
            nextWord();
            setCurrentCharIndex(0);
        } else if (code === 'Backspace') {
            chageDeleteWord(currentCharIndex - 1);
            setCurrentCharIndex((prev) => (prev === 0 ? prev : prev - 1));
        } else if (key.length === 1 && key.match(/[а-я А-Я ,.?!"-;']/i)) {
            if (!isStarted) setIsStarted(true);
            if (currentCharIndex >= currentWord.length) return;
            changeAddWord(event.key, currentCharIndex);
            setCurrentCharIndex((prev) => prev + 1);
        }
    };

    const focusOnText = () => {
        if (!divRef.current) return;

        divRef.current.focus();
    };

    useEffect(() => {
        focusOnText();
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

    return (
        <div className='min-h-screen flex flex-col gap-4 justify-center items-center bg-green-900 relative'>
            <ParaElement
                currentWord={currentWord}
                resultList={resultList}
                leftList={leftList}
                currentCharIndex={currentCharIndex}
                divRef={divRef}
                focusOnText={focusOnText}
                handleKeyDown={handleKeyDown}
            />
            <div>
                <button
                    className='text-white border p-2'
                    onClick={handleRestart}
                >
                    {isStarted ? 'Заново' : 'Другой текст'}
                </button>
            </div>
        </div>
    );
};
