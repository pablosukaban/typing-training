import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const App = () => {
    const TEXT = '123 456 789';

    const [inputValue, setInputValue] = useState('');
    const [correctValue, setCorrectValue] = useState('');
    const [newText, setNewText] = useState(TEXT);
    const [lastWord, setLastWord] = useState('');

    const inputValueLengthRef = useRef(0);

    const isError = inputValue !== TEXT.slice(0, inputValue.length);

    console.log('input', inputValue);
    console.log('correct', correctValue);
    console.log('newText', newText);
    // console.log(inputValueLengthRef.current);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        setLastWord(inputValue);

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
            <div className="w-[500px] p-8">
                <input
                    type={'text'}
                    className="w-full border border-white py-2 px-4 bg-gray-800 text-white text-lg"
                    value={inputValue}
                    onChange={handleChange}
                />
                <p className="text-2xl">
                    <span className="text-indigo-300">{correctValue}</span>
                    <span className={`${isError && 'text-red-400'}`}>
                        {newText}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default App;
