import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './en.json';
import BD from './bd.json';
import { getUrlParams } from '@/utils';

// the translations≈ßß
const resources = {
  en: {
    translation: {
      ...EN,
    },
  },
  bd: {
    translation: {
      ...BD,
    },
  },
};
const lang = getUrlParams('lang');
// 缓存语言
const localLang = localStorage.getItem('lang');
// 设置的目标语言
const targetLang = lang || localLang || 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    preload: ['en', 'bd'],
    lng: targetLang,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
