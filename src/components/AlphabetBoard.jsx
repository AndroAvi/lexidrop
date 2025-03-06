import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableLetter from './DraggableLetter';
import DropZone from './DropZone';

// Vowels (ಸ್ವರಗಳು)
const vowels = [
  { kannada: 'ಅ', english: 'a' },
  { kannada: 'ಆ', english: 'aa' },
  { kannada: 'ಇ', english: 'i' },
  { kannada: 'ಈ', english: 'ii' },
  { kannada: 'ಉ', english: 'u' },
  { kannada: 'ಊ', english: 'uu' },
  { kannada: 'ಋ', english: 'ru' },
  { kannada: 'ಎ', english: 'e' },
  { kannada: 'ಏ', english: 'ee' },
  { kannada: 'ಐ', english: 'ai' },
  { kannada: 'ಒ', english: 'o' },
  { kannada: 'ಓ', english: 'oo' },
  { kannada: 'ಔ', english: 'au' },
  { kannada: 'ಅಂ', english: 'am' },
  { kannada: 'ಅಃ', english: 'ah' },
];

// Consonants (ವ್ಯಂಜನಗಳು)
const consonants = [
  { kannada: 'ಕ', english: 'ka' },
  { kannada: 'ಖ', english: 'kha' },
  { kannada: 'ಗ', english: 'ga' },
  { kannada: 'ಘ', english: 'gha' },
  { kannada: 'ಙ', english: 'nga' },
  { kannada: 'ಚ', english: 'cha' },
  { kannada: 'ಛ', english: 'chha' },
  { kannada: 'ಜ', english: 'ja' },
  { kannada: 'ಝ', english: 'jha' },
  { kannada: 'ಞ', english: 'nya' },
  { kannada: 'ಟ', english: 'ta' },
  { kannada: 'ಠ', english: 'tha' },
  { kannada: 'ಡ', english: 'da' },
  { kannada: 'ಢ', english: 'dha' },
  { kannada: 'ಣ', english: 'Na' },
  { kannada: 'ತ', english: 'tha' },
  { kannada: 'ಥ', english: 'thha' },
  { kannada: 'ದ', english: 'dha' },
  { kannada: 'ಧ', english: 'dhha' },
  { kannada: 'ನ', english: 'na' },
  { kannada: 'ಪ', english: 'pa' },
  { kannada: 'ಫ', english: 'pha' },
  { kannada: 'ಬ', english: 'ba' },
  { kannada: 'ಭ', english: 'bha' },
  { kannada: 'ಮ', english: 'ma' },
  { kannada: 'ಯ', english: 'ya' },
  { kannada: 'ರ', english: 'ra' },
  { kannada: 'ಲ', english: 'la' },
  { kannada: 'ವ', english: 'va' },
  { kannada: 'ಶ', english: 'sha' },
  { kannada: 'ಷ', english: 'Sha' },
  { kannada: 'ಸ', english: 'sa' },
  { kannada: 'ಹ', english: 'ha' },
  { kannada: 'ಳ', english: 'La' },
];

// Calculate how many blank spaces we need to add after vowels to ensure consonants start on a new row
const vowelsRowCount = Math.ceil(vowels.length / 8);
const blankSpacesNeeded = (vowelsRowCount * 8) - vowels.length;

// Create blank spaces to fill the row
const blankSpaces = Array(blankSpacesNeeded).fill().map((_, index) => ({
  kannada: null,
  english: null
}));

// Combine vowels, blank spaces, and consonants
const kannadaAlphabet = [...vowels, ...blankSpaces, ...consonants];

const AlphabetBoard = () => {
  // Track letters that have been correctly placed in their slots
  const [placedLetters, setPlacedLetters] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const totalLetters = kannadaAlphabet.length;
  const placedCount = placedLetters.size;
  const progress = Math.round((placedCount / totalLetters) * 100);

  // Check for completion and trigger success animation
  React.useEffect(() => {
    if (progress === 100 && !showSuccess) {
      setShowSuccess(true);
    }
  }, [progress]);
  // Create a randomized array of draggable Kannada letters
  const [randomizedLetters] = useState(() => {
    const letters = kannadaAlphabet.map((letter, index) => ({
      id: index + 1,
      letter: letter.kannada
    }));

    // Fisher-Yates shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return letters;
  });
  const COLS = 8;
  // Calculate required rows based on total letters
  const ROWS = Math.ceil(kannadaAlphabet.length / COLS);

  // Create a flat array of all cells needed
  const cells = Array(ROWS * COLS).fill(null).map((_, index) => {
    if (index < kannadaAlphabet.length) {
      return kannadaAlphabet[index].english;
    }
    return null;
  });

  return (
    <div className={`min-h-screen w-screen overflow-auto bg-[#DB5375] flex items-center justify-center
         ${showSuccess ? 'animate-[pulse_1s_ease-in-out]' : ''}`}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-[#F4C7C7] text-center mb-4">
          Kannada Matrix
        </h2>
        <p className="text-center text-[#F4C7C7] text-lg mb-8">
          Fill in the Kannada letters matching these English sounds
        </p>

        <DndProvider backend={HTML5Backend}>
          <div className="bg-[#F4C7C7] rounded-xl p-8 shadow-lg w-fit mx-auto">
            <h3 className="text-xl font-bold text-[#E34234] mb-6 text-center">English Transliterations</h3>
            <div className="flex flex-col items-center justify-center">
              {/* Column Headers */}
              {/* <div className="flex pl-8 mb-4">
                <div className="w-8 h-8" />
                <div className="grid grid-cols-8 gap-4 w-[640px]">
                  {Array(COLS).fill().map((_, i) => (
                    <div key={`col-${i}`} className="flex justify-center">
                      <span className="text-sm font-semibold text-[#E34234]">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Matrix with Row Numbers */}
              <div className="flex">
                {/* Row Headers */}
                {/* <div className="w-8 flex flex-col gap-4 mr-4">
                  {Array(ROWS).fill().map((_, i) => (
                    <div key={`row-${i}`} className="h-14 flex items-center justify-center">
                      <span className="text-sm font-semibold text-[#E34234]">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div> */}

                {/* Matrix */}
                <div className="w-[640px]">
                  {/* Section Label for Vowels */}
                  <div className="text-sm font-medium text-[#E34234]/80 mb-2 text-left">Vowels (ಸ್ವರಗಳು)</div>
                  <div className="grid grid-cols-8 gap-4">
                    {/* Vowels Section */}
                    {cells.slice(0, vowels.length).map((cell, index) => {
                      const kannadaLetter = index < vowels.length ? vowels[index].kannada : null;
                      return (
                        <DropZone
                          key={index}
                          expectedKannada={kannadaLetter}
                          englishTransliteration={cell}
                          onDrop={(item) => {
                            if (item.letter === kannadaLetter) {
                              setPlacedLetters(prev => new Set([...prev, item.letter]));
                            }
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Separator Line */}
                  <div className="border-b-2 border-[#E34234]/20 my-6"></div>

                  {/* Section Label for Consonants */}
                  <div className="text-sm font-medium text-[#E34234]/80 mb-2 text-left">Consonants (ವ್ಯಂಜನಗಳು)</div>
                  <div className="grid grid-cols-8 gap-4">
                    {/* Consonants Section */}
                    {cells.slice(vowels.length + blankSpacesNeeded).map((cell, index) => {
                      const consonantIndex = index + vowels.length + blankSpacesNeeded;
                      const kannadaLetter = consonantIndex < kannadaAlphabet.length ? kannadaAlphabet[consonantIndex].kannada : null;
                      return (
                        <DropZone
                          key={consonantIndex}
                          expectedKannada={kannadaLetter}
                          englishTransliteration={cell}
                          onDrop={(item) => {
                            if (item.letter === kannadaLetter) {
                              setPlacedLetters(prev => new Set([...prev, item.letter]));
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Draggable Kannada Letters Section */}
          <div className="mt-12 bg-[#F4C7C7] rounded-xl p-8 shadow-lg w-fit mx-auto">
            <h3 className="text-xl font-bold text-[#E34234] mb-6 text-center">Kannada Letters</h3>
            <div className="w-[640px]">
              {/* Vowels Section */}
              <div className="text-sm font-medium text-[#E34234]/80 mb-2 text-left">Vowels (ಸ್ವರಗಳು)</div>
              <div className="grid grid-cols-8 gap-4 mb-6">
                {randomizedLetters
                  .filter(letter => vowels.some(v => v.kannada === letter.letter))
                  .map((letter) => {
                    const isPlaced = placedLetters.has(letter.letter);
                    return !isPlaced ? (
                      <DraggableLetter
                        key={letter.id}
                        letter={letter.letter}
                        id={letter.id}
                      />
                    ) : (
                      <div key={letter.id} className="h-14 w-14" />
                    );
                  })}
              </div>

              {/* Separator Line */}
              <div className="border-b-2 border-[#E34234]/20 my-6"></div>

              {/* Consonants Section */}
              <div className="text-sm font-medium text-[#E34234]/80 mb-2 text-left">Consonants (ವ್ಯಂಜನಗಳು)</div>
              <div className="grid grid-cols-8 gap-4">
                {randomizedLetters
                  .filter(letter => consonants.some(c => c.kannada === letter.letter))
                  .map((letter) => {
                    const isPlaced = placedLetters.has(letter.letter);
                    return !isPlaced ? (
                      <DraggableLetter
                        key={letter.id}
                        letter={letter.letter}
                        id={letter.id}
                      />
                    ) : (
                      <div key={letter.id} className="h-14 w-14" />
                    );
                  })}
              </div>
            </div>
          </div>
        </DndProvider>


      </div>
    </div>
  );
};

export default AlphabetBoard;
