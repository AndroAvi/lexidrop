import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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

// Navigation header component
const NavHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-xl font-bold text-purple-600">DrLingua Kannada</h1>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <button 
              onClick={() => navigate('/')}
              className={`${location.pathname === '/' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent'}
                         hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/bento')}
              className={`${location.pathname === '/bento' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent'}
                         hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
            >
              Bento Board
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Home page wrapper component
const Home = () => {
  const navigate = useNavigate();
  return <TitlePage onStartGame={() => navigate('/bento')} />;
};

// Bento game wrapper component
const BentoGame = () => {
  const navigate = useNavigate();
  return <AlphabetBoard onStartPractice={() => navigate('/game')} />;
};

// Main App component
const App = () => {

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-50">
          <NavHeader />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bento" element={<BentoGame />} />
              <Route path="/game" element={<Game />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </DndProvider>
    </BrowserRouter>
  );
};

// Game component for the final matching game
const Game = () => {
  const navigate = useNavigate();
  const [placedLetters, setPlacedLetters] = useState(Array(kannadaLetters.length).fill(null));

  const handleDrop = (item, index) => {
    if (kannadaLetters[index].id === item.id) {
      const updatedLetters = [...placedLetters];
      updatedLetters[index] = item.letter;
      setPlacedLetters(updatedLetters);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full">
      <div className="flex items-center justify-between w-full max-w-3xl mb-8 px-4">
        <button
          onClick={() => navigate('/bento')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Bento Board</span>
        </button>
        <h1 className="text-2xl font-bold">Kannada Letter Matching</h1>
      </div>

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
  );
};

export default App;
