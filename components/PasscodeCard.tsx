'use client'
import React, { useState, useEffect } from 'react';
import Keypad from './Keypad';
import TimeDisplay from './TimeDisplay';
import Image from 'next/image';

const PasscodeCard: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const correctPasscode = '010532';
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeTogether, setTimeTogether] = useState('');

  const calculateTimeTogether = () => {
    const startDate = new Date('2024-08-01T23:45:00');
    const currentDate = new Date();
    const diff = currentDate.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeTogether(
      `💖 We've been together for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds 💖`
    );
  };

  const handleButtonClick = (value: string) => {
    if (passcode.length < 6) {
      const newPasscode = passcode + value;
      setPasscode(newPasscode);
      
      if (newPasscode === correctPasscode) {
        setIsUnlocked(true);
        calculateTimeTogether();
      }
    }
  };

  const handleClear = () => {
    setPasscode('');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isUnlocked) {
      timer = setInterval(calculateTimeTogether, 1000);
    }
    return () => clearInterval(timer);
  }, [isUnlocked]);

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg w-80 bg-opacity-80">
        <div className="flex justify-center mb-4">
          <Image
            src="/img/img1.jpg"
            alt="ily"
            width={128} 
            height={128} 
            className="w-32 h-32 rounded-full border-2 border-pink-400"
          />
        </div>
        
        {!isUnlocked && (
          <div className="text-center text-gray-700 font-semibold mb-4">
            Enter Password
          </div>
        )}

        {isUnlocked ? (
          <TimeDisplay timeTogether={timeTogether} />
        ) : (
          <Keypad onButtonClick={handleButtonClick} onClear={handleClear} passcode={passcode} />
        )}
      </div>
    </div>
  );
};

export default PasscodeCard;
