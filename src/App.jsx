import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import Home from "./pages/Home";
import GameBoard from "./pages/GameBoard";

const App = () => {
  return (
    <BrowserRouter>
        <div className="min-h-screen bg-[#DB5375]">
          <NavHeader />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game_board" element={<GameBoard />} />
            </Routes>
          </main>
        </div>
    </BrowserRouter>
  );
};

export default App;
