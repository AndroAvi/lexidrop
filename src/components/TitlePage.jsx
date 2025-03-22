import React from 'react';

const TitlePage = ({ onStartGame }) => {
  return (
    <div className="inset-0 w-screen h-screen overflow-hidden bg-[#DB5375] text-[#F4C7C7]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full text-center space-y-8 px-4">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in">
          LexiDrop
        </h1>
        <p className="text-xl mb-8 text-[#F4C7C7]">
          Learn language scripts through an engaging drag-and-drop experience.
        </p>
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-[#F4C7C7] text-[#E34234] rounded-full text-xl font-semibold 
                     hover:bg-[#f0baba] transform hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-xl"
          >
            Start Learning
          </button>
        </div>
        <div className="mt-12 text-[#F4C7C7]">
          <p className="text-lg">Master characters one by one</p>
          <p className="text-sm mt-2">Drag and drop to match the correct positions</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
