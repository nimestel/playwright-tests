import { expect } from '@playwright/test';

export const normalizeSpaces = (text: string) => {
    return text
        .trim()
        .replace(/\u00a0/g, ' ')
        .replace(/\s\s+/g, ' ');
};

export const normalizeText = (inputString: string) =>
    inputString.replace(/\s/g, '').toLowerCase();

export function splitStringByCapitalLetters(stringWithCapitalLetters: string) {
    return stringWithCapitalLetters.split(/(?=[A-Z])/).join(' ');
}
