import React from 'react';

interface LetterCardProps {
  onClose: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ onClose }) => {
  const letterContent = `
    Dear Princess,

    I love you so much. Today 1/10/2024 is our 2 months anniversary, I hope we stay together forever.
    I created this website to tell you that i love you so much, and so that we can keep this memory forever with us.
    You mean the world to me and I love you so much you have no idea. You're my favorite person now and forever.
    I'm very grateful to have you in my life, and I'm so sorry I keep hurting you even though I don't mean it,
    but this is my first time, you are my first and last love, I will always love you.

    Forever yours,
    Charbel
  `;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4 text-center">❤️ My Letter to You ❤️</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{letterContent}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;
