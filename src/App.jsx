import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavHeader from "./components/NavHeader";
import Home from "./pages/Home";
import GameBoard from "./pages/GameBoard";


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
              <Route path="/game_board" element={<GameBoard />} />
            </Routes>
          </main>
        </div>
      </DndProvider>
    </BrowserRouter>
  );
};

export default App;
