import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useText } from '../hooks/useText';
import { ParaElement } from './ParaElement';

// какой нить параграфКомпонент, в который все слова передавать и он сам будет отслеживать че выводить, нужно по идее просто очищать resultList, мб отслеживать высоту

// если currentWord координата y на третьей строке, удалять первую строку, тем самым вверх уезжает

export type wordObjType = {
    text: string;
    correct: boolean | null;
};

type FormatType = 'json' | 'html';
type FetchTextType = 'sentence' | 'paragraph' | 'title';

const BASE_URL = 'https://fish-text.ru/';
const FORMAT: FormatType = 'json';
const NUMBER = 1;
const TYPE: FetchTextType = 'title';
const PARAMS = `get?format=${FORMAT}&number=${NUMBER}&type=${TYPE}`;

type ResponseJSONType = {
    status: string;
    text: string;
    errorCode?: string;
};

export const SecondMonkey = () => {
    const [mainText, setMainText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // const [elements, setElements] = useState<HTMLElement[]>([]);

    if (containerRef.current) {
        // const parent = containerRef.current;
        // console.log('block', block.getBoundingClientRect());
    }

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

    const handleWordClick = (element: HTMLElement) => {
        // console.log(element.innerText);
        // setElements((prev) => [...prev, element]);
    };

    const moveLine = () => {
        // const elem = elements[0];
        // console.log(elem.getBoundingClientRect());
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
            moveLine();
        } else if (code === 'Backspace') {
            prevChar(currentCharIndex - 1);
            setCurrentCharIndex((prev) => (prev === 0 ? prev : prev - 1));
        } else if (key.length === 1 && key.match(/[а-я А-Я ,.?!"-;']/i)) {
            if (!isStarted) setIsStarted(true);
            if (currentCharIndex >= currentWord.length) return;

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
                handleWordClick={handleWordClick}
            />
            <div>
                <button
                    className='text-white border p-2'
                    onClick={handleRestart}
                >
                    {isStarted ? 'Заново' : 'Другой текст'}
                </button>
                {/* <button onClick={() => console.log(elements)}>Click</button> */}
            </div>
        </div>
    );
};
