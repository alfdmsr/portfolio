import { useEffect, useState } from "react";
import { initialLanguage, LANGUAGE_KEY, translate } from "./messages";
import { LanguageContext } from "./useLanguage";

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        let storage;

        try {
        storage = window.localStorage;
    } catch {
        // tetap berjalan tanpa penyimpanan.
    }

    return initialLanguage(
        storage, navigator.languages ?? [navigator.language]
    );
    });

    useEffect(() => {
        document.documentElement.lang = language;

        document.querySelector('meta[name="description"]')?.setAttribute(
            "content",
            translate(language, "description")
        );
        try {
            window.localStorage.setItem(LANGUAGE_KEY, language);
        } catch {
            // Pergantian bahasa tetap berfungsi.
        }
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: (key) => translate(language, key),
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}