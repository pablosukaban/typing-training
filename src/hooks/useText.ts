import { useEffect, useState } from 'react';
import { wordObjType } from '../components/SecondMonkey';

export const useText = (text: string, isStrictMode: boolean) => {
    const wordList = text.split(' ').slice(1);
    const [charList, setCharList] = useState(
        wordList.map((word) =>
            word.split('').map((char) => {
                const newObj: wordObjType = { text: char, correct: null };
                return newObj;
            })
        )
    );
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(charList[currentWordIndex]);

    const nextWord = () => {
        if (isStrictMode === true) {
            if (
                currentWord.filter((item) => item.correct).length ===
                currentWord.length
            ) {
                setCurrentWordIndex((prev) => prev + 1);
            } else {
                return;
            }
        } else {
            setCurrentWordIndex((prev) => prev + 1);
        }
    };

    const changeAddWord = (givenChar: string, idx: number) => {
        const newWord = currentWord.map((item) => {
            if (currentWord.indexOf(item) === idx) {
                if (item.text === givenChar) {
                    return { text: item.text, correct: true } as wordObjType;
                } else {
                    return { text: item.text, correct: false } as wordObjType;
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
                return { text: item.text, correct: null } as wordObjType;
            } else {
                return item;
            }
        });
        setCurrentWord(newWord);
    };

    useEffect(() => {
        setCurrentWord(charList[currentWordIndex]);
    }, [currentWordIndex]);

    console.log(currentWord);

    return {
        isError: false,
        changeWord: changeAddWord,
        currentWord,
        nextWord,
        chageDeleteWord,
    };
};
