import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

// TODO Нажимаю букву, добавляю ее в inputValue, если inputValue === example.slice(0, inputValue.length), то окрашивать введенный текст в белый

// TODO Сдлеать как в клава копи, добавлять в новый спан текст, и у него делать моргающий курсор в конце,

const BASE_URL = 'https://fish-text.ru/';
const FORMAT = 'json';
const NUMBER = 3;
const PARAMS = `get?format=${FORMAT}&number=${NUMBER}`;

type ResponseJSONType = {
    status: string;
    text: string;
    errorCode?: string;
};

export const MokeyCopy = () => {
    const [mainText, setMainText] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [correctValue, setCorrectValue] = useState('');
    const [newText, setNewText] = useState('');
    const [lastWord, setLastWord] = useState('');
    const [started, setStarted] = useState(false);

    const inputValueLengthRef = useRef(0);
    // const inputValueRef = useRef<HTMLInputElement>(null);

    const isError = inputValue !== mainText.slice(0, inputValue.length);

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!divRef.current) return;

        divRef.current.focus();

        return () => divRef.current?.blur();
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        setStarted(true);
        if (event.key === 'Backspace') {
            setInputValue((prev) => prev.slice(0, prev.length - 1));

            return;
        }
        if (event.key.length > 1) {
            return;
        }
        setInputValue((prev) => prev + event.key);
    };

    useEffect(() => {
        let ignore = false;

        const fetchText = async (url: string) => {
            const response = await fetch(url);
            const json: ResponseJSONType = await response.json();

            if (!ignore) {
                setMainText(json.text);
                setNewText(json.text);
            }
        };

        fetchText(BASE_URL + PARAMS);

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        setLastWord(inputValue);

        if (inputValue.length === 0) {
            setCorrectValue('');
            setNewText(mainText);
            return;
        }

        if (inputValue === correctValue) return;

        // if (isError) return;

        setCorrectValue(inputValue);

        if (inputValue.length >= inputValueLengthRef.current) {
            setNewText((prev) => prev.slice(1));
        } else {
            setNewText((prev) => lastWord[lastWord.length - 1] + prev);
        }

        inputValueLengthRef.current = inputValue.length;
    }, [inputValue]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-900 ">
            <div
                className="text-gray-300 text-3xl max-w-6xl focus:outline-none"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={divRef}
            >
                <p className={`text-2xl ${isError && 'text-red-400'}`}>
                    <span className="text-indigo-300 correct-text">
                        {correctValue}
                    </span>
                    <span>{newText}</span>
                </p>
            </div>
        </div>
    );
};
