import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableLetter from "./components/DraggableLetter";
import DropZone from "./components/DropZone";
import TitlePage from "./components/TitlePage";
import AlphabetBoard from "./components/AlphabetBoard";
import logo from "./assets/logo.svg";

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
    <header className="fixed top-0 left-0 right-0 bg-[#DB5375]/85 backdrop-blur-md transition-all duration-300 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center space-x-3 group transition-all duration-300 ease-in-out">
              <div className="relative">
                <img src={logo} alt="DrLingua Logo" className="w-8 h-8 transition-all duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-[360deg]" />
                <div className="absolute inset-0 bg-[#F4C7C7]/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out blur-sm group-hover:blur-md"></div>
              </div>
              <div className="flex flex-col transition-all duration-300 ease-in-out transform group-hover:translate-x-0.5">
                <span className="text-xl font-bold text-[#F4C7C7] tracking-wider transition-all duration-300 ease-in-out group-hover:text-[#F4C7C7]">DrLingua</span>
                <span className="text-xs text-[#F4C7C7]/70 font-medium -mt-1 tracking-wide transition-all duration-300 ease-in-out group-hover:text-[#F4C7C7]">ಕನ್ನಡ</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <button 
              onClick={() => navigate('/')}
              className={`${location.pathname === '/' ? 'text-[#F4C7C7] border-[#F4C7C7]' : 'text-[#F4C7C7]/70 border-transparent'}
                         hover:text-[#F4C7C7] px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/bento')}
              className={`${location.pathname === '/bento' ? 'text-[#F4C7C7] border-[#F4C7C7]' : 'text-[#F4C7C7]/70 border-transparent'}
                         hover:text-[#F4C7C7] px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
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
        <div className="min-h-screen bg-[#DB5375]">
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#DB5375] w-full">
      <div className="flex items-center justify-between w-full max-w-3xl mb-8 px-4">
        <button
          onClick={() => navigate('/bento')}
          className="flex items-center space-x-2 text-[#F4C7C7] hover:text-[#F4C7C7]/80 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Bento Board</span>
        </button>
        <h1 className="text-2xl font-bold text-[#F4C7C7]">Kannada Letter Matching</h1>
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
