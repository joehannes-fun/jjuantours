import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../contexts/I18nContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang: 'en' | 'es') => {
    setLocale(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-lg bg-white text-gray-700 hover:bg-gray-100 transition-all duration-300"
        title="Change Language"
      >
        {locale === 'en' ? 'EN' : 'ES'}
      </button>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border p-2 z-50">
          <button
            onClick={() => selectLanguage('en')}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 ${
              locale === 'en' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'
            }`}
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => selectLanguage('es')}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              locale === 'es' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'
            }`}
            title="Español"
          >
            ES
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
