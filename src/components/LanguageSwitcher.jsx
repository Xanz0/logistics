import { useState } from 'react';
import { useTranslation } from '../utils/i18n';
import '../styles/language.css';

export default function LanguageSwitcher() {
  const { currentLang, setLang, languages } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (lang) => {
    setLang(lang);
    setShowDropdown(false);
  };

  const getFlag = (lang) => {
    const flags = {
      uz: '🇺🇿',
      ru: '🇷🇺',
      en: '🇬🇧'
    };
    return flags[lang] || '🌐';
  };

  return (
    <div className="language-switcher">
      <button 
        className="lang-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="flag">{getFlag(currentLang)}</span>
        <span className="lang-code">{currentLang.toUpperCase()}</span>
        <span className="arrow">▼</span>
      </button>

      {showDropdown && (
        <div className="lang-dropdown">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              className={`lang-option ${currentLang === code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(code)}
            >
              <span className="flag">{getFlag(code)}</span>
              <span className="lang-name">{name}</span>
              {currentLang === code && <span className="check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}