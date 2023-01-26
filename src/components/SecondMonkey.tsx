import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';
import { ResponseJSONType } from '../types';
import { ParaElement } from './ParaElement';

type FormatType = 'json' | 'html';
type FetchTextType = 'sentence' | 'paragraph' | 'title';

const BASE_URL = 'https://fish-text.ru/';
const FORMAT: FormatType = 'json';
const NUMBER = 1;
const TYPE: FetchTextType = 'title';
const PARAMS = `get?format=${FORMAT}&number=${NUMBER}&type=${TYPE}`;

const testText = 'word1 word2 word3 word4 word5';

export const SecondMonkey = () => {
    const [mainText, setMainText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const {
        currentWord,
        wordIndex,
        resultList,
        leftList,
        nextWord,
        resetCurrentWord,
        nextChar,
        prevChar,
    } = useText(mainText);

    const wordCount = mainText.split(' ').length;

    // if (wordCount * 2 === elements.length) {
    //     console.log('if');
    //     const newArr = [...elements];
    //     newArr.splice(wordCount);
    //     setElements(newArr);
    // }

    // console.log('wordCount', wordCount);

    const fetchText2 = async (url: string): Promise<ResponseJSONType> => {
        const response = await fetch(url);
        return await response.json();
    };

    const focusOnText = () => {
        if (!containerRef.current) return;

        containerRef.current.focus();
    };

    const handleRestart = async () => {
        const result = await fetchText2(BASE_URL + PARAMS);

        setMainText(result.text);

        setCurrentCharIndex(0);
        resetCurrentWord();
        focusOnText();

        setIsStarted(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const code = event.code;
        const key = event.key;

        if (code === 'Space') {
            if (currentWord.word.some((letter) => letter.correct === null))
                return;
            if (wordIndex === mainText.split(' ').length - 1) {
                handleRestart();
                return;
            }
            nextWord();
            setCurrentCharIndex(0);
        } else if (code === 'Backspace') {
            prevChar(currentCharIndex - 1);
            setCurrentCharIndex((prev) => (prev === 0 ? prev : prev - 1));
        } else if (key.length === 1 && key.match(/[а-я А-Я ,.?!"-;']/i)) {
            if (!isStarted) setIsStarted(true);
            if (currentCharIndex >= currentWord.word.length) return;

            nextChar(event.key, currentCharIndex);
            setCurrentCharIndex((prev) => prev + 1);
        }
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
                console.log(json.text);
                setMainText(json.text);
            }
        };

        fetchText(BASE_URL + PARAMS);

        return () => {
            ignore = true;
        };
    }, []);

    // useEffect(() => {
    //     const coordsList = elements.map((element) =>
    //         element.getBoundingClientRect()
    //     );
    //     console.log(coordsList);
    // }, [elements]);

    return (
        <div
            className='min-h-screen flex flex-col gap-4 justify-center items-center bg-green-900 relative'
            ref={containerRef}
        >
            <ParaElement
                currentWord={currentWord}
                resultList={resultList}
                leftList={leftList}
                currentCharIndex={currentCharIndex}
                containerRef={containerRef}
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
