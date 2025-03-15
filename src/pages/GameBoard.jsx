import {useLanguages} from "../hooks/useLanguages";
import AlphabetBoard from "../components/AlphabetBoard";
import SelectionScreen from "../components/SelectionScreen";

const GameBoard = () => {
    const { languageNames, selectedLanguageData, selectLanguage } = useLanguages();

    if (selectedLanguageData) {
        return <AlphabetBoard {...selectedLanguageData} />;
    }

    return (
        <SelectionScreen languages={languageNames} handleLanguageSelect={selectLanguage} />
    );
};

export default GameBoard;