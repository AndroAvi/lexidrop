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

const kannadaAlphabet = [...vowels, ...consonants];

const AlphabetBoard = ({ onStartPractice }) => {
  const [placedLetters, setPlacedLetters] = useState(Array(kannadaAlphabet.length).fill(null));
  const [showSuccess, setShowSuccess] = useState(false);
  const totalLetters = kannadaAlphabet.length;
  const placedCount = placedLetters.filter(Boolean).length;
  const progress = Math.round((placedCount / totalLetters) * 100);

  // Check for completion and trigger success animation
  React.useEffect(() => {
    if (progress === 100 && !showSuccess) {
      setShowSuccess(true);
    }
  }, [progress]);
  // Create a flat array of draggable Kannada letters
  const draggableLetters = kannadaAlphabet.map((letter, index) => ({
    id: index + 1,
    letter: letter.kannada
  }));
  const ROWS = 6;
  const COLS = 9;
  
  // Create a flat array of all cells needed
  const cells = Array(ROWS * COLS).fill(null).map((_, index) => {
    if (index < kannadaAlphabet.length) {
      return kannadaAlphabet[index].english;
    }
    return null;
  });

  return (
    <div className={`min-h-screen w-screen overflow-auto bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center
         ${showSuccess ? 'animate-[pulse_1s_ease-in-out]' : ''}`}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Kannada Matrix
        </h2>
        <p className="text-center text-white/80 text-lg mb-8">
          Fill in the Kannada letters matching these English sounds
        </p>
        
        <DndProvider backend={HTML5Backend}>
        <div className="bg-white/95 backdrop-blur rounded-xl p-8 shadow-lg w-fit mx-auto border-2 border-purple-100">
          <h3 className="text-xl font-bold text-purple-600 mb-6 text-center">English Transliterations</h3>
          <div className="flex flex-col items-center justify-center">
          {/* Column Headers */}
          <div className="flex pl-8 mb-4">
            <div className="w-8 h-8" /> {/* Spacer for row headers */}
            <div className="grid grid-cols-9 gap-4 w-[720px]">
              {Array(COLS).fill().map((_, i) => (
                <div key={`col-${i}`} className="flex justify-center">
                  <span className="text-sm font-semibold text-purple-600">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matrix with Row Numbers */}
          <div className="flex">
            {/* Row Headers */}
            <div className="w-8 flex flex-col gap-4 mr-4">
              {Array(ROWS).fill().map((_, i) => (
                <div key={`row-${i}`} className="h-14 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>

            {/* Matrix */}
            <div className="w-[720px]">
              <div className="grid grid-cols-9 gap-4">
                {cells.map((cell, index) => {
                  const kannadaLetter = index < kannadaAlphabet.length ? kannadaAlphabet[index].kannada : null;
                  return (
                    <DropZone
                      key={index}
                      expectedKannada={kannadaLetter}
                      englishTransliteration={cell}
                      onDrop={(item) => {
                        const newPlacedLetters = [...placedLetters];
                        newPlacedLetters[index] = item.letter;
                        setPlacedLetters(newPlacedLetters);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
        </DndProvider>

        {/* Draggable Kannada Letters Section */}
        <div className="mt-12 bg-white/95 backdrop-blur rounded-xl p-8 shadow-lg w-fit mx-auto border-2 border-purple-100">
          <h3 className="text-xl font-bold text-purple-600 mb-6 text-center">Kannada Letters</h3>
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-9 gap-4 w-[720px]">
              {draggableLetters.map((letter) => {
                const isPlaced = placedLetters.includes(letter.letter);
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
          </DndProvider>
        </div>

        <div className="mt-8 text-center space-y-4">
          {/* Progress Bar */}
          <div className="w-[720px] mx-auto bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out rounded-full
                ${progress === 100 ? 'bg-green-500 animate-[pulse_2s_ease-in-out_infinite]' : 'bg-green-500'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/90 font-medium">
            {progress === 100 ? (
              <span className="text-green-300 font-bold animate-[bounce_1s_ease-in-out_infinite]">
                All letters placed correctly! Great job! 🎉
              </span>
            ) : (
              <span>
                {placedCount} of {totalLetters} letters placed correctly
              </span>
            )}
          </div>
          <button
            onClick={() => progress === 100 && onStartPractice()}
            className={`px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 
                     shadow-lg hover:shadow-xl ${progress === 100 
                       ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
                       : 'bg-white text-purple-600 hover:bg-purple-100 hover:scale-105 opacity-50 cursor-not-allowed'}`}
            disabled={progress !== 100}
          >
            Start Writing Practice →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlphabetBoard;
