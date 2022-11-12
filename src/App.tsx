import React, { ChangeEvent, useEffect, useState } from 'react';
// import './App.css';

//  TEXT = 123456
//  ввел 1, inputValue= 1, correct - 1, newText = 23456
//  ввел 2, inputValue= 12,  correct - 12, newText = 3456
//  ввел ш, inputValue= 12ш, correct - 12, newText = 456, error - true
//  удалил ш, inputValue=12, correct - 12, newText = 56, error - false
//
//
//
//
//

// TODO при удалении правильного символа, не изменять newText

const App = () => {
    const TEXT = '123 456 789';

    const [inputValue, setInputValue] = useState('');
    const [correctValue, setCorrectValue] = useState('');
    const [newText, setNewText] = useState(TEXT);
    const [isError, setIsError] = useState(false);

    console.log('input', inputValue);
    console.log('correct', correctValue);
    console.log('newText', newText);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (inputValue.length === 0) return;

        if (inputValue === correctValue) return;

        if (inputValue === TEXT.slice(0, inputValue.length)) {
            setCorrectValue(inputValue);
            setNewText((prev) => prev.slice(1));
            setIsError(false);
        } else {
            setIsError(true);
        }
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
                    <span className="text-purple-300">{correctValue}</span>
                    <span style={{ color: isError ? 'red' : '' }}>
                        {newText}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default App;
