const SelectionScreen = ({languages, handleLanguageSelect}) => {
    return (
        <div className="min-h-screen w-screen overflow-auto bg-[#DB5375] flex items-center justify-center">
            <div className="min-h-screen w-full flex flex-col items-center justify-center py-8">
                <h2 className="text-3xl font-bold text-[#F4C7C7] text-center mb-4">
                    Select a Language
                </h2>
                <p className="text-center text-[#F4C7C7] text-lg mb-8">
                    Choose a language to practice with Lexidrop
                </p>
                
                <div className="bg-[#F4C7C7] rounded-xl p-8 shadow-lg max-w-xl">
                    <h3 className="text-xl font-bold text-[#E34234] mb-6 text-center">Available Languages</h3>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {languages.map((language) => (
                            <button 
                                key={language} 
                                onClick={() => handleLanguageSelect(language)}
                                className="bg-[#E34234] hover:bg-[#E34234]/80 text-[#F4C7C7] font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-lg flex items-center justify-center"
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 text-center space-y-4 w-full max-w-4xl">
                    <p className="text-[#F4C7C7] text-sm">
                        Click on a language to start learning
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SelectionScreen;
