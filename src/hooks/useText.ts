import { useEffect, useRef, useState } from 'react';
import { wordObjType } from '../components/SecondMonkey';

export const useText = (text: string, isStrictMode: boolean) => {
    const wordList = text.split(' ');
    const charList = wordList.map((word) =>
        word.split('').map((char) => {
            const newObj: wordObjType = { text: char, correct: null };
            return newObj;
        })
    );
    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWordIndexRef = useRef(0);
    const [currentWord, setCurrentWord] = useState(charList[0]);
    const [resultList, setResultList] = useState<wordObjType[][]>([]);

    const leftList = charList.slice(currentWordIndexRef.current + 1);

    const nextWord = () => {
        if (isStrictMode === true) {
            if (
                currentWord.filter((item) => item.correct).length ===
                currentWord.length
            ) {
                setResultList((prev) => [...prev, currentWord]);
                currentWordIndexRef.current += 1;
                setCurrentWord(charList[currentWordIndexRef.current]);
            } else {
                return;
            }
        } else {
            setResultList((prev) => [...prev, currentWord]);
            currentWordIndexRef.current += 1;
            setCurrentWord(charList[currentWordIndexRef.current]);
        }
    };

    const changeAddWord = (givenChar: string, idx: number) => {
        // if (idx > currentWord.length) return;
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

    // useEffect(() => {
    //     setCurrentWord(charList[currentWordIndexRef.current]);
    // }, [currentWordIndexRef.current]);

    return {
        isError: false,
        resultList,
        currentWord,
        leftList,
        nextWord,
        changeAddWord,
        chageDeleteWord,
        wordIndex: currentWordIndexRef.current,
    };
};
