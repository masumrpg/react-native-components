import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { createI18nInstance, I18nConfig } from "../config";

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  i18n: I18n;
};

const KEY_LANGUAGE = "USER_LANGUAGE";

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {
    // Default empty implementation
  },
  i18n: createI18nInstance(),
});

// Re-export I18nConfig for external use
export type { I18nConfig };

interface LanguageProviderProps {
  children: React.ReactNode;
  i18nConfig?: I18nConfig;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  i18nConfig,
}) => {
  const [i18nInstance] = useState(() => createI18nInstance(i18nConfig));
  const [locale, setLocaleState] = useState(i18nInstance.locale);

  const setLocale = async (lang: string) => {
    i18nInstance.locale = lang;
    setLocaleState(lang);
    await AsyncStorage.setItem(KEY_LANGUAGE, lang);
  };

  useEffect(() => {
    void (async () => {
      const saved = await AsyncStorage.getItem(KEY_LANGUAGE);
      if (saved) {
        const supportedLocales = i18nConfig?.supportedLocales ?? ['en', 'id'];
        if (supportedLocales.includes(saved)) {
          i18nInstance.locale = saved;
          setLocaleState(saved);
        }
      }
    })();
  }, [i18nInstance, i18nConfig]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, i18n: i18nInstance }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.displayName = "LanguageProvider";

export const useLanguage = () => useContext(LanguageContext);
