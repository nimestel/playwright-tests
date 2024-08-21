export type Locale = {
    url: string;
    name: string;
};

export const LOCALES: {
    RUSSIAN: Locale;
    UNITED_KINGDOM: Locale;
    ENGLISH: Locale;
    SPANISH: Locale;
    HINDI: Locale;
    CHINESE: Locale;
    TURKISH: Locale;
    PORTUGUESE: Locale;
    INDONESIAN: Locale;
    KOREAN: Locale;
} = {
    ENGLISH: {
        url: 'en',
        name: 'en'
    },
    SPANISH: {
        url: 'es',
        name: 'es'
    },
    HINDI: {
        url: 'hi',
        name: 'hi'
    },
    CHINESE: {
        url: 'zh',
        name: 'zh'
    },
    PORTUGUESE: {
        url: 'pt',
        name: 'pt'
    },
    RUSSIAN: {
        url: 'ru',
        name: 'ru'
    },
    INDONESIAN: {
        url: 'id',
        name: 'id'
    },
    TURKISH: {
        url: 'tr',
        name: 'tr'
    },
    UNITED_KINGDOM: {
        url: 'uk',
        name: 'uk'
    },
    KOREAN: {
        url: 'ko',
        name: 'ko'
    }
};
