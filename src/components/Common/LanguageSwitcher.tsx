import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'az', label: 'AZ' },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== currentLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="relative flex items-center justify-center bg-white/30 backdrop-blur-lg p-1 rounded-3xl border border-white/30 shadow-2xl">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`relative z-10 px-4 text-xs font-bold rounded-3xl transition-all duration-300 ${
            currentLang === lang.code
              ? 'text-white'
              : 'text-gray-800 hover:text-emerald-600'
          }`}
        >
          {lang.label}
        </button>
      ))}

      <motion.div
        layout
        layoutId="language-switch"
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-emerald-700 to-teal-500 rounded-3xl blur-[2px] z-0 transition-all"
        animate={{
          left: currentLang === 'en' ? '0%' : '50%',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />
    </div>
  );
};

export default LanguageSwitcher;
