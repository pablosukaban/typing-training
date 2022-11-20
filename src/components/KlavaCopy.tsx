import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const BASE_URL = 'https://fish-text.ru/';
const FORMAT = 'json';
const NUMBER = 3;
const PARAMS = `get?format=${FORMAT}&number=${NUMBER}`;

type ResponseJSONType = {
    status: string;
    text: string;
    errorCode?: string;
};

export const KlavaCopy = () => {
    const [mainText, setMainText] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [correctValue, setCorrectValue] = useState('');
    const [newText, setNewText] = useState('');
    const [lastWord, setLastWord] = useState('');

    const inputValueLengthRef = useRef(0);
    const inputValueRef = useRef<HTMLInputElement>(null);

    const isError = inputValue !== mainText.slice(0, inputValue.length);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
        inputValueRef.current?.focus();

        if (inputValue.length === 0) {
            setCorrectValue('');
            setNewText((prev) => lastWord + prev);
            return;
        }

        if (inputValue === correctValue) return;

        if (isError) return;

        setCorrectValue(inputValue);

        if (inputValue.length >= inputValueLengthRef.current) {
            setNewText((prev) => prev.slice(1));
        } else {
            setNewText((prev) => lastWord[lastWord.length - 1] + prev);
        }

        inputValueLengthRef.current = inputValue.length;
    }, [inputValue]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800 text-white">
            <div className="w-fit max-w-3xl p-8">
                <input
                    type={'text'}
                    ref={inputValueRef}
                    className="w-full border border-white py-2 px-4 bg-gray-800 text-white text-lg"
                    value={inputValue}
                    onChange={handleChange}
                />
                <p className={`${isError && 'text-red-400'} text-2xl`}>
                    <span className="text-indigo-300">{correctValue}</span>
                    <span>{newText}</span>
                </p>
            </div>
        </div>
    );
};
