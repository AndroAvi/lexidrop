import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableLetter from './DraggableLetter';
import DropZone from './DropZone';
import { colors, layout, typography, grids, progress, separator, combineClasses } from '../styles/styles';

const AlphabetBoard = ({languageName, vowels, consonants}) => {
  // Calculate how many blank spaces we need to add after vowels to ensure consonants start on a new row
  const vowelsRowCount = Math.ceil(vowels.length / 8);
  const blankSpacesNeeded = (vowelsRowCount * 8) - vowels.length;

  // Create blank spaces to fill the row
  const blankSpaces = Array(blankSpacesNeeded).fill().map((_, index) => ({
    native: null,
    english: null
  }));

  // Combine vowels, blank spaces, and consonants
  const alphabet = [...vowels, ...blankSpaces, ...consonants];

  // Track letters that have been correctly placed in their slots
  const [placedLetters, setPlacedLetters] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const totalLetters = alphabet.length - blankSpaces.length;
  const placedCount = placedLetters.size;
  const progress = Math.round((placedCount / totalLetters) * 100);

  useEffect(() => {
    setupDraggableLetters();
  }, []);

  // Check for completion and trigger success animation
  useEffect(() => {
    if (progress === 100 && !showSuccess) {
      setShowSuccess(true);
    }
  }, [progress, showSuccess]);

  const setupDraggableLetters = () => {
    const letters = alphabet.map((letter, index) => ({
      id: index + 1,
      letter: letter.native
    }));

    // Fisher-Yates shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return letters;
  }

  // Create a randomized array of draggable letters
  const [draggableLetters, setDraggableLetters] = useState(setupDraggableLetters);

  const COLS = 8;
  // Calculate required rows based on total letters
  const ROWS = Math.ceil(alphabet.length / COLS);

  // Create a flat array of all cells needed
  const cells = Array(ROWS * COLS).fill(null).map((_, index) => {
    if (index < alphabet.length) {
      return alphabet[index].english;
    }
    return null;
  });

  return (
    <div className={combineClasses(
      layout.fullScreen,
      colors.primary,
      layout.centered,
      showSuccess ? 'animate-[pulse_1s_ease-in-out]' : ''
    )}>
      <div className={layout.container}>
        <h2 className={typography.heading}>
          {languageName} Drag n Drop
        </h2>
        <p className={typography.paragraph}>
          Fill in the {languageName} letters matching their English sounds
        </p>

        <DndProvider backend={HTML5Backend}>
          {/* Main content area with side-by-side layout */}
          <div className="flex flex-row justify-center gap-8 w-full px-4">
            {/* Left side: Draggable Native Language Letters */}
            <div className={combineClasses(layout.card, "w-1/2 max-w-xl")}>
              <h3 className={typography.subheading}>{languageName} Letters</h3>
              <div className="w-full">
                {/* Vowels Section */}
                <div className={typography.sectionLabel}>Vowels (ಸ್ವರಗಳು)</div>
                <div className={combineClasses(grids.fiveColumns, 'mb-6')}>
                  {draggableLetters
                    .filter(letter => vowels.some(v => v.native === letter.letter))
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
                <div className={separator.default}></div>

                {/* Consonants Section */}
                <div className={typography.sectionLabel}>Consonants (ವ್ಯಂಜನಗಳು)</div>
                <div className={grids.fiveColumns}>
                  {draggableLetters
                    .filter(letter => consonants.some(c => c.native === letter.letter))
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

            {/* Right side: Drop Zones */}
            <div className={combineClasses(layout.card, "w-1/2 max-w-xl")}>
              <h3 className={typography.subheading}>English Transliterations</h3>
              <div className="w-full">
                {/* Section Label for Vowels */}
                <div className={typography.sectionLabel}>Vowels (ಸ್ವರಗಳು)</div>
                <div className={grids.fiveColumns}>
                  {/* Vowels Section */}
                  {cells.slice(0, vowels.length).map((cell, index) => {
                    const nativeLetter = index < vowels.length ? vowels[index].native : null;
                    return (
                      <DropZone
                        key={index}
                        expectedNative={nativeLetter}
                        englishTransliteration={cell}
                        onDrop={(item) => {
                          if (item.letter === nativeLetter) {
                            setPlacedLetters(prev => new Set([...prev, item.letter]));
                          }
                        }}
                      />
                    );
                  })}
                </div>

                {/* Separator Line */}
                <div className={separator.default}></div>

                {/* Section Label for Consonants */}
                <div className={typography.sectionLabel}>Consonants (ವ್ಯಂಜನಗಳು)</div>
                <div className={grids.fiveColumns}>
                  {/* Consonants Section */}
                  {cells.slice(vowels.length + blankSpacesNeeded).map((cell, index) => {
                    const consonantIndex = index + vowels.length + blankSpacesNeeded;
                    const nativeLetter = consonantIndex < alphabet.length ? alphabet[consonantIndex].native : null;
                    return (
                      <DropZone
                        key={consonantIndex}
                        expectedNative={nativeLetter}
                        englishTransliteration={cell}
                        onDrop={(item) => {
                          if (item.letter === nativeLetter) {
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
        </DndProvider>

        <div className="mt-8 text-center space-y-4 w-full max-w-4xl">
          {/* Progress Bar */}
          <div className={progress.container}>
            <div
              className={combineClasses(
                progress.bar,
                progress === 100 ? progress.complete : ''
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={colors.lightText}>
            {progress === 100 ? (
              <span className={combineClasses(colors.lightText, 'font-bold animate-[bounce_1s_ease-in-out_infinite]')}>
                All letters placed correctly! Great job! 🎉
              </span>
            ) : (
              <span>
                {placedCount} of {totalLetters} letters placed correctly
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetBoard;