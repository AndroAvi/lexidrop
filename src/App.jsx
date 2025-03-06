import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableLetter from "./components/DraggableLetter";
import DropZone from "./components/DropZone";
import TitlePage from "./components/TitlePage";
import AlphabetBoard from "./components/AlphabetBoard";

const kannadaLetters = [
    { id: 1, letter: "ಅ", correctSlot: 0 },
    { id: 2, letter: "ಆ", correctSlot: 1 },
    { id: 3, letter: "ಇ", correctSlot: 2 },
    { id: 4, letter: "ಈ", correctSlot: 3 },
];

const App = () => {
    const [gameState, setGameState] = useState('title'); // 'title' | 'alphabet' | 'game'
    const [placedLetters, setPlacedLetters] = useState(Array(kannadaLetters.length).fill(null));

    const handleDrop = (item, index) => {
        if (kannadaLetters[index].id === item.id) {
            const updatedLetters = [...placedLetters];
            updatedLetters[index] = item.letter;
            setPlacedLetters(updatedLetters);
        }
    };

    const handleStartGame = () => {
        setGameState('alphabet');
    };

    const handleStartPractice = () => {
        setGameState('game');
    };

    if (gameState === 'title') {
        return <TitlePage onStartGame={handleStartGame} />;
    }

    if (gameState === 'alphabet') {
        return <AlphabetBoard onStartPractice={handleStartPractice} />;
    }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full">
        <h1 className="text-2xl font-bold mb-4">Kannada Letter Matching</h1>

        <div className="flex space-x-4">
          {kannadaLetters.map((letter) => (
            <DraggableLetter key={letter.id} letter={letter.letter} id={letter.id} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {kannadaLetters.map((letter, index) => (
            <DropZone
              key={index}
              correctLetter={placedLetters[index]}
              onDrop={handleDrop}
              index={index}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
