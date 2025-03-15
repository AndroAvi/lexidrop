import { colors, layout, typography, buttons, grids, combineClasses } from '../styles/styles';

const SelectionScreen = ({languages, handleLanguageSelect}) => {
    return (
        <div className={combineClasses(layout.fullScreen, colors.primary, layout.centered)}>
            <div className={layout.container}>
                <h2 className={typography.heading}>Select a Language</h2>
                <p className={typography.paragraph}>Choose a language to practice with Lexidrop</p>
                
                <div className={combineClasses(layout.card, "max-w-xl")}>
                    <h3 className={typography.subheading}>Available Languages</h3>
                    <div className={grids.twoColumns}>
                        {languages.map((language) => (
                            <button 
                                key={language} 
                                onClick={() => handleLanguageSelect(language)}
                                className={combineClasses(buttons.primary, buttons.primaryHover)}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 text-center space-y-4 w-full max-w-4xl">
                    <p className={typography.smallText}>
                        Click on a language to start learning
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SelectionScreen;
