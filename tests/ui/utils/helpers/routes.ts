import { Locale } from './locales';

export default {
    getLocale: (locale: Locale) => `https://**/_next/data/**/${locale.url}.json`,
    getActivityGroup: (activityGroupSlug: string = 'active') =>
        `https://**/activities/${activityGroupSlug}.json?slug=${activityGroupSlug}`
};
