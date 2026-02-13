import { en } from "./translations/en";
import { es } from "./translations/es";
import { de } from "./translations/de";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { pt } from "./translations/pt";
import { ja } from "./translations/ja";
import { ko } from "./translations/ko";
import { zh } from "./translations/zh";
import { ru } from "./translations/ru";
import { tr } from "./translations/tr";
import { nl } from "./translations/nl";
import { pl } from "./translations/pl";
import { sv } from "./translations/sv";
import { hi } from "./translations/hi";

export type LegalTranslations = {
    privacy: {
        discord: { title: string; subtitle: string };
        badge: string;
        title_p1: string;
        title_p2: string;
        description: string;
        last_update: string;
        sections: {
            intro: { title: string; content: string };
            collection: { title: string; content: string };
            security: { title: string; content: string };
            third_party: {
                title: string;
                admob_title: string;
                admob_content: string;
                crashlytics_title: string;
                crashlytics_content: string;
            };
            children: { title: string; content: string };
            contact: { title: string; content: string };
        };
        footer_copy: string;
    };
    terms: {
        badge: string;
        title_p1: string;
        title_p2: string;
        description: string;
        last_update: string;
        intro_p1: string;
        intro_p2: string;
        sections: {
            license: { title: string; content: string };
            acceptable: { title: string; content: string; items: string[] };
            intellectual: { title: string; content: string };
            privacy: { title: string; content: string; link_text: string };
            third_party: { title: string; content: string };
            liability: { title: string; content: string };
            modifications: { title: string; content: string };
            jurisdiction: { title: string; content: string };
            contact: { title: string; content: string };
        };
        footer_copy: string;
    };
};

export const LEGAL_TRANSLATIONS: Record<string, LegalTranslations> = {
    en,
    es,
    de,
    fr,
    it,
    pt,
    ja,
    ko,
    zh,
    ru,
    tr,
    nl,
    pl,
    sv,
    hi,
};
