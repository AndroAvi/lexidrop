import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableLetter from './DraggableLetter';

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
    <div className="min-h-screen w-screen overflow-auto bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Kannada Matrix
        </h2>
        <p className="text-center text-white/80 text-lg mb-8">
          Fill in the Kannada letters matching these English sounds
        </p>
        
        <div className="bg-white/95 backdrop-blur rounded-xl p-8 shadow-lg w-fit mx-auto">
          <div className="flex flex-col items-center justify-center">
          {/* Column Headers */}
          <div className="flex pl-8 mb-2">
            <div className="w-8" /> {/* Spacer for row headers */}
            <div className="grid grid-cols-9 gap-1 w-[360px]">
              {Array(COLS).fill().map((_, i) => (
                <div key={`col-${i}`} className="flex justify-center">
                  <span className="text-xs font-semibold text-purple-500">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matrix with Row Numbers */}
          <div className="flex">
            {/* Row Headers */}
            <div className="w-8 flex flex-col gap-1">
              {Array(ROWS).fill().map((_, i) => (
                <div key={`row-${i}`} className="h-9 flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-500">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>

            {/* Matrix */}
            <div className="w-[360px]">
              <div className="grid grid-cols-9 gap-1">
                {cells.map((cell, index) => (
                  <div
                    key={index}
                    className={`h-10 w-10 ${cell ? 'border border-purple-300 bg-purple-50/90' : 'border border-gray-200 bg-gray-50/60'} 
                               rounded-md flex items-center justify-center hover:bg-purple-100 hover:border-purple-400
                               transition-all duration-200 ${cell ? 'cursor-pointer shadow-sm hover:shadow' : ''}`}
                  >
                    <span className="text-center text-gray-700 text-sm font-medium select-none tracking-wide">
                      {cell || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Draggable Kannada Letters Section */}
        <div className="mt-12 bg-white/95 backdrop-blur rounded-xl p-8 shadow-lg w-fit mx-auto">
          <h3 className="text-xl font-bold text-purple-600 mb-6 text-center">Kannada Letters</h3>
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-9 gap-4 max-w-[720px]">
              {draggableLetters.map((letter) => (
                <DraggableLetter
                  key={letter.id}
                  letter={letter.letter}
                  id={letter.id}
                />
              ))}
            </div>
          </DndProvider>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onStartPractice}
            className="px-8 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold 
                     hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-xl"
          >
            Start Writing Practice →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlphabetBoard;
