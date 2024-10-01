import React, { useState } from 'react';
import LetterCard from './LetterCard';
import PicturesCard from './PicturesCard';

interface TimeDisplayProps {
  timeTogether: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeTogether }) => {
  const [showLetterCard, setShowLetterCard] = useState(false);
  const [showPicturesCard, setShowPicturesCard] = useState(false);

  return (
    <div className="text-green-600 text-center font-bold mb-4">
      <div className="mt-4 bg-pink-200 p-4 rounded shadow">
        <p className="text-pink-800">{timeTogether}</p>
        <div className="flex justify-center mt-2 space-x-2">
          <span>❤️</span>
          <span>🌸</span>
          <span>💫</span>
          <span>🌹</span>
          <span>🐻</span>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setShowLetterCard(true)}
          className="bg-red-400 text-white px-4 py-2 rounded-full shadow hover:bg-red-500 transition flex items-center space-x-2"
        >
          <span className="text-xl">💌</span>
          <span>Love Letter</span>
        </button>
        <button
          onClick={() => setShowPicturesCard(true)}
          className="bg-pink-400 text-white px-4 py-2 rounded-full shadow hover:bg-pink-500 transition flex items-center space-x-2"
        >
          <span className="text-xl">📸</span>
          <span>Our Memories</span>
        </button>
      </div>

      {showLetterCard && <LetterCard onClose={() => setShowLetterCard(false)} />}

      {showPicturesCard && <PicturesCard onClose={() => setShowPicturesCard(false)} />}
    </div>
  );
};

export default TimeDisplay;
