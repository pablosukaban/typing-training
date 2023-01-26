export type ResponseJSONType = {
    status: string;
    text: string;
    errorCode?: string;
};

export type LetterObjType = {
    letter: string;
    correct: boolean | null;
};

export type WordObjType = {
    id: string;
    word: LetterObjType[];
};
