import { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableLetter from './DraggableLetter';
import DropZone from './DropZone';
import CustomDragLayer from './CustomDragLayer';
import { colors, layout, typography, progress, combineClasses } from '../styles/styles';
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

const AlphabetBoard = ({languageName, vowels, consonants, onBack}) => {
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
  const [resetCounter, setResetCounter] = useState(0);
  const [progress, setProgress] = useState("stopped");
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const totalLetters = alphabet.length - blankSpaces.length;
  const placedCount = placedLetters.size;
  const progressPercent = Math.round((placedCount / totalLetters) * 100);

  useEffect(() => {
    setupDraggableLetters();
  }, []);

  useEffect(() => {
    if (progress === "started" && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (progress !== "started" && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [progress]);

  // Check for completion and trigger success animation
  useEffect(() => {
    if (progressPercent === 100 && !showSuccess) {
      setShowSuccess(true);
      setProgress("finished");
    }
  }, [progressPercent, showSuccess]);

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

  const handleReset = () => {
    setPlacedLetters(new Set());
    setDraggableLetters(setupDraggableLetters());
    setShowSuccess(false);
    setResetCounter(prev => prev + 1);
    setProgress("stopped");
    setElapsedTime(0);
  }

  // Create a randomized array of draggable letters
  const [draggableLetters, setDraggableLetters] = useState(setupDraggableLetters());

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
      <div className={combineClasses(layout.container, "px-1 md:px-8 pt-2 pb-4 md:py-8")}>
        <div className="flex flex-col w-full max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="text-[#F4C7C7] text-sm md:text-base hover:bg-[#E34234]/20 py-1 px-3 rounded-full transition-colors self-start mb-2 md:mb-4"
          >
            ← Back
          </button>
          <h2 className={combineClasses(typography.heading, "text-lg md:text-3xl text-center mb-1 md:mb-4")}>
            {languageName} Drag n Drop
          </h2>
          <p className={combineClasses("text-[#F4C7C7] text-xs md:text-lg text-center mb-2 md:mb-8")}>
            Match the {languageName} letters with their sounds
          </p>

          {/* Timer Display */}
          <div className="w-full max-w-xs mx-auto mb-4 bg-[#F4C7C7]/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="text-[#F4C7C7] text-2xl font-bold">
                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-[#F4C7C7] text-lg">
                {placedCount}/{totalLetters} letters
              </div>
            </div>
          </div>

          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <CustomDragLayer />
            {/* Main content area with responsive layout */}
            <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-8 w-full">
              {/* Mobile Game Container - Bento style layout */}
              <div className="flex flex-col md:hidden w-full space-y-2">
                {/* Compact Progress Bar for Mobile */}
                <div className="px-1 mb-1">
                  <div className="h-1.5 bg-[#F4C7C7]/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${progressPercent === 100 ? 'bg-[#E34234] animate-pulse' : 'bg-[#E34234]'}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#F4C7C7]/70 mt-0.5">
                    <span>{placedCount}/{totalLetters}</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>

                {/* Combined Minimalist Game Board */}
                <div className="bg-[#F4C7C7]/10 backdrop-blur-sm rounded-lg p-2">
                  {/* Dropzones Grid - English Transliterations */}
                  <div className="grid grid-cols-6 gap-1 mb-3">
                    {cells.filter(cell => cell !== null).map((cell, index) => {
                      const letterObj = alphabet.find(a => a.english === cell);
                      const nativeLetter = letterObj ? letterObj.native : null;
                      return (
                        <DropZone
                          key={`drop-${index}`}
                          expectedNative={nativeLetter}
                          englishTransliteration={cell}
                          reset={resetCounter}
                          onDrop={(item) => {
                            if (item.letter === nativeLetter) {
                              setPlacedLetters(prev => new Set([...prev, item.letter]));
                            }
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Draggable Letters Grid */}
                  <div className="grid grid-cols-6 gap-1">
                    {draggableLetters
                      .filter(letter => letter.letter !== null)
                      .map((letter) => {
                        const isPlaced = placedLetters.has(letter.letter);
                        return !isPlaced ? (
                          <DraggableLetter
                            key={`drag-${letter.id}`}
                            letter={letter.letter}
                            id={letter.id}
                            progress={progress}
                            setProgress={setProgress}
                          />
                        ) : (
                          <div key={`empty-${letter.id}`} className="h-9 w-9 sm:h-10 sm:w-10" />
                        );
                      })}
                  </div>
                </div>

                {/* Reset Button for mobile */}
                <button
                  onClick={handleReset}
                  className="bg-transparent text-[#F4C7C7] text-xs font-medium py-1 px-3 rounded-full hover:bg-[#E34234]/20 transition-colors self-center"
                >
                  Reset
                </button>
              </div>

              {/* Desktop Layout - Side by side */}
              <div className="hidden md:flex md:flex-row justify-center gap-8 w-full">
                {/* Left side: Draggable Native Language Letters */}
                <div className={combineClasses(layout.card, "w-1/2 max-w-xl p-8")}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={typography.subheading}>{languageName} Letters</h3>
                  </div>

                  <div className="w-full">
                    {/* Vowels Section */}
                    <div className={typography.sectionLabel}>Vowels (ಸ್ವರಗಳು)</div>
                    <div className="grid grid-cols-5 gap-4 mb-6">
                      {draggableLetters
                        .filter(letter => vowels.some(v => v.native === letter.letter))
                        .map((letter) => {
                          const isPlaced = placedLetters.has(letter.letter);
                          return !isPlaced ? (
                            <DraggableLetter
                              key={letter.id}
                              letter={letter.letter}
                              id={letter.id}
                              progress={progress}
                              setProgress={setProgress}
                            />
                          ) : (
                            <div key={letter.id} className="h-12 w-12" />
                          );
                        })}
                    </div>

                    {/* Separator Line */}
                    <div className="border-b-2 border-[#E34234]/20 my-6"></div>

                    {/* Consonants Section */}
                    <div className={typography.sectionLabel}>Consonants (ವ್ಯಂಜನಗಳು)</div>
                    <div className="grid grid-cols-5 gap-4">
                      {draggableLetters
                        .filter(letter => consonants.some(c => c.native === letter.letter))
                        .map((letter) => {
                          const isPlaced = placedLetters.has(letter.letter);
                          return !isPlaced ? (
                            <DraggableLetter
                              key={letter.id}
                              letter={letter.letter}
                              id={letter.id}
                              progress={progress}
                              setProgress={setProgress}
                            />
                          ) : (
                            <div key={letter.id} className="h-12 w-12" />
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Right side: Drop Zones */}
                <div className={combineClasses(layout.card, "w-1/2 max-w-xl p-8")}>
                  <h3 className={typography.subheading}>English Transliterations</h3>
                  <div className="w-full">
                    {/* Section Label for Vowels */}
                    <div className={typography.sectionLabel}>Vowels (ಸ್ವರಗಳು)</div>
                    <div className="grid grid-cols-5 gap-4">
                      {/* Vowels Section */}
                      {cells.slice(0, vowels.length).map((cell, index) => {
                        const nativeLetter = index < vowels.length ? vowels[index].native : null;
                        return (
                          <DropZone
                            key={index}
                            expectedNative={nativeLetter}
                            englishTransliteration={cell}
                            reset={resetCounter}
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
                    <div className="border-b-2 border-[#E34234]/20 my-6"></div>

                    {/* Section Label for Consonants */}
                    <div className={typography.sectionLabel}>Consonants (ವ್ಯಂಜನಗಳು)</div>
                    <div className="grid grid-cols-5 gap-4">
                      {/* Consonants Section */}
                      {cells.slice(vowels.length + blankSpacesNeeded).map((cell, index) => {
                        const consonantIndex = index + vowels.length + blankSpacesNeeded;
                        const nativeLetter = consonantIndex < alphabet.length ? alphabet[consonantIndex].native : null;
                        return (
                          <DropZone
                            key={consonantIndex}
                            expectedNative={nativeLetter}
                            englishTransliteration={cell}
                            reset={resetCounter}
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
            </div>
          </DndProvider>

          {/* Desktop Progress and Reset Button Area */}
          <div className="hidden md:block mt-8 text-center space-y-4 w-full max-w-4xl px-4">
            {/* Reset Button */}
            <div className="pt-4">
              <button
                onClick={handleReset}
                className={combineClasses(
                  "bg-transparent text-[#F4C7C7] text-base font-medium",
                  "px-6 py-2 mx-auto rounded-full hover:bg-[#E34234]/20 transition-colors"
                )}
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetBoard;