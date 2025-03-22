const modules = import.meta.glob('./*.js', { eager: true });

const languages = {};
Object.entries(modules).forEach(([path, module]) => {
    if (module.default && module.default.languageName) {
        languages[module.default.languageName.toLowerCase()] = module.default;
    }
});

export const languageNames = Object.keys(languages);

export const getLanguageData = (name) => languages[name] || null;