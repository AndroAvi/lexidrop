const SelectionScreen = ({languages, handleLanguageSelect}) => {

    return (
        <div>
            <h1>Select a Language</h1>
            {languages.map((language) => (
                <button key={language} onClick={() => handleLanguageSelect(language)}>
                    {language}
                </button>
            ))}
        </div>
    );
};

export default SelectionScreen;
