import { useEffect, useRef, useState } from 'react';
import { wordObjType } from '../components/SecondMonkey';

function formatLetter(givenLetter: string) {
    if (givenLetter === 'ё') {
        return 'е';
    }
    if (givenLetter === 'Ё') {
        return 'Е';
    }
    if (givenLetter === '—') {
        return '-';
    }
    return givenLetter;
}

export const useText = (text: string) => {
    const wordList = text.split(' ');

    const charList = wordList.map((word) =>
        word.split('').map((char) => {
            const newObj: wordObjType = {
                text: formatLetter(char),
                correct: null,
            };
            return newObj;
        })
    );

    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWordIndexRef = useRef(0);
    const [currentWord, setCurrentWord] = useState<wordObjType[]>([]);
    const [resultList, setResultList] = useState<wordObjType[][]>([]);

    const leftList = charList.slice(currentWordIndexRef.current + 1);

    useEffect(() => {
        setCurrentWord(charList[0]);
    }, [text]);

    const nextWord = () => {
        // if (isStrictMode === true) {
        //     if (
        //         currentWord.filter((item) => item.correct).length ===
        //         currentWord.length
        //     ) {
        //         setResultList((prev) => [...prev, currentWord]);
        //         currentWordIndexRef.current += 1;
        //         setCurrentWord(charList[currentWordIndexRef.current]);
        //     } else {
        //         return;
        //     }
        // } else {
        //     setResultList((prev) => [...prev, currentWord]);
        //     currentWordIndexRef.current += 1;
        //     setCurrentWord(charList[currentWordIndexRef.current]);
        // }
        setResultList((prev) => [...prev, currentWord]);
        currentWordIndexRef.current += 1;
        setCurrentWord(charList[currentWordIndexRef.current]);
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

    const restartWord = () => {
        setCurrentWord(charList[0]);
        currentWordIndexRef.current = 0;
        setResultList([]);
    };

    // useEffect(() => {
    //     setCurrentWord(charList[currentWordIndexRef.current]);
    // }, [currentWordIndexRef.current]);

    // if (currentWord.length === 0) return;

    return {
        isError: false,
        resultList,
        currentWord,
        leftList,
        wordIndex: currentWordIndexRef.current,
        nextWord,
        changeAddWord,
        chageDeleteWord,
        restartWord,
    };
};
