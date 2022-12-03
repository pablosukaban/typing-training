import { useEffect, useRef, useState } from 'react';
import { wordObjType } from '../components/SecondMonkey';

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

    const currentWordIndexRef = useRef(0);
    const [currentWord, setCurrentWord] = useState<wordObjType[]>([]);
    const [resultList, setResultList] = useState<wordObjType[][]>([]);

    const leftList = charList.slice(currentWordIndexRef.current + 1);

    useEffect(() => {
        setCurrentWord(charList[0]);
    }, [text]);

    const nextWord = () => {
        setResultList((prev) => [...prev, currentWord]);
        currentWordIndexRef.current += 1;
        setCurrentWord(charList[currentWordIndexRef.current]);
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

    const restartWord = () => {
        setCurrentWord(charList[0]);
        currentWordIndexRef.current = 0;
        setResultList([]);
    };

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
