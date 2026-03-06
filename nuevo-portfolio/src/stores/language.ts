/**
 * Language Store — Nanostores
 * Replaces LanguageContext.tsx from the original React SPA
 */
import { atom, computed } from 'nanostores';
import { translations } from '@/data/translations';

export type Language = 'es' | 'en';

export const $language = atom<Language>('es');

/** Get a translated string by key */
export function t(key: string): string {
    const lang = $language.get();
    const keys = key.split('.');
    let value: unknown = translations[lang];
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = (value as Record<string, unknown>)[k];
        } else {
            return key; // fallback to key if not found
        }
    }
    return typeof value === 'string' ? value : key;
}

export function toggleLanguage() {
    $language.set($language.get() === 'es' ? 'en' : 'es');
}

export function setLanguage(lang: Language) {
    $language.set(lang);
}
