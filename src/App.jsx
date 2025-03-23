import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GameBoard from "./pages/GameBoard";

const App = () => {
  return (
    <BrowserRouter>
        <div className="min-h-screen bg-[#DB5375] flex flex-col">
          <NavHeader />
          <main className="pt-16 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game_board" element={<GameBoard />} />
            </Routes>
          </main>
          <Footer />
          <Analytics />
        </div>
    </BrowserRouter>
  );
};

export default App;
