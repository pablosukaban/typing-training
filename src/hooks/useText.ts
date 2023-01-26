import { useEffect, useRef, useState } from 'react';
import { LetterObjType, WordObjType } from '../types';

export const useText = (text: string) => {
    const wordList = text.split(' ');

    const charList = wordList.map((word) => {
        const typedWord = word.split('').map((char) => {
            const newObj: LetterObjType = {
                letter: formatLetter(char),
                correct: null,
            };
            return newObj;
        });

        return { id: crypto.randomUUID(), word: typedWord } as WordObjType;
    });

    const currentWordIndexRef = useRef(0);
    const [currentWord, setCurrentWord] = useState<WordObjType>({
        id: '',
        word: [],
    });
    const [resultList, setResultList] = useState<WordObjType[]>([]);

    const leftList = charList.slice(currentWordIndexRef.current + 1);

    useEffect(() => {
        setCurrentWord(charList[0]);
    }, [text]);

    const nextWord = () => {
        setResultList((prev) => [...prev, currentWord]);
        currentWordIndexRef.current += 1;
        setCurrentWord(charList[currentWordIndexRef.current]);
    };

    const nextChar = (givenChar: string, idx: number) => {
        const newWord = currentWord.word.map((item) => {
            if (currentWord.word.indexOf(item) === idx) {
                if (item.letter === givenChar) {
                    return { ...item, correct: true } as LetterObjType;
                } else {
                    return { ...item, correct: false } as LetterObjType;
                }
            } else {
                return item;
            }
        });
        setCurrentWord((prev) => ({ ...prev, word: newWord }));
    };

    const prevChar = (idx: number) => {
        const newWord = currentWord.word.map((item) => {
            if (currentWord.word.indexOf(item) === idx) {
                return { ...item, correct: null } as LetterObjType;
            } else {
                return item;
            }
        });
        setCurrentWord((prev) => ({ ...prev, word: newWord }));
    };

    const resetCurrentWord = () => {
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
        nextChar,
        prevChar,
        resetCurrentWord,
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
