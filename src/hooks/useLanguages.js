import {useState} from 'react';
import {languageNames, getLanguageData} from '../constants/languages/index.js';

export const useLanguages = () => {
    const [selectedLanguageData, setSelectedLanguageData] = useState(null);

    const selectLanguage = (languageName) => {
        setSelectedLanguageData(getLanguageData(languageName));
    };

    return { languageNames, selectedLanguageData, selectLanguage };
};