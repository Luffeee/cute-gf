import React from 'react';

interface KeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
  passcode: string;
}

const Keypad: React.FC<KeypadProps> = ({ onButtonClick, onClear, passcode }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '#'].map((item, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(item.toString())}
            className="bg-white p-2 rounded text-gray-800 shadow hover:bg-gray-100 transition"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="password"
          value={passcode}
          readOnly
          className="w-full text-center p-2 border rounded bg-white shadow"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-4 py-1 rounded shadow hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Keypad;
