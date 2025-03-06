import React from 'react';

const TitlePage = ({ onStartGame }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full text-center space-y-8 px-4">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in">
          DrLingua ಕನ್ನಡ Bento
        </h1>
        <p className="text-xl mb-8 text-purple-100">
          Learn Kannada script through an engaging drag-and-drop experience
        </p>
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-white text-purple-600 rounded-full text-xl font-semibold 
                     hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-xl"
          >
            Start Learning
          </button>
        </div>
        <div className="mt-12 text-purple-100">
          <p className="text-lg">Master Kannada characters one by one</p>
          <p className="text-sm mt-2">Drag and drop to match the correct positions</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
