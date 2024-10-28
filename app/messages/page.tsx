'use client'
import React, { useState, useEffect } from 'react';

interface Message {
  message: string;
  displayTime: string;
  createdAt: string;
}

const MessagesPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<{ [key: number]: boolean }>({});
  const [elapsedTimes, setElapsedTimes] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Convert the input `time` to a Date object
    const displayDate = new Date(time);
    const currentDateTime = new Date();
    
    // Check if the display time is in the future
    if (displayDate <= currentDateTime) {
      setStatus('⚠️ Display time must be in the future.');
      return;
    }
  
    // Create the message object
    const newMessage = {
      message,
      displayTime: displayDate.toISOString(), // Use ISO format for consistency
      createdAt: currentDateTime.toISOString(),
    };
  
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
  
      if (response.ok) {
        setStatus('Message scheduled successfully!');
        setMessage('');
        setTime('');
        const updatedMessages = await (await fetch('/api/messages')).json();
        setMessages(updatedMessages);
      } else {
        setStatus('Failed to schedule message. Try again.');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      setStatus('An error occurred. Please try again.');
    }
  };
  

  const toggleExpandMessage = (index: number) => {
    setExpandedMessages((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatDisplayDuration = (displayTime: string) => {
    const displayDate = new Date(displayTime);
    const now = new Date();
    let diffMs = Math.abs(now.getTime() - displayDate.getTime());

    const units = [
      { label: 'y', ms: 1000 * 60 * 60 * 24 * 365 },
      { label: 'mo', ms: 1000 * 60 * 60 * 24 * 30 },
      { label: 'w', ms: 1000 * 60 * 60 * 24 * 7 },
      { label: 'd', ms: 1000 * 60 * 60 * 24 },
      { label: 'h', ms: 1000 * 60 * 60 },
      { label: 'm', ms: 1000 * 60 },
      { label: 's', ms: 1000 },
    ];

    let formatted = '';
    for (const unit of units) {
      const count = Math.floor(diffMs / unit.ms);
      if (count > 0) {
        formatted += `${count}${unit.label} `;
        diffMs -= count * unit.ms;
      }
      if (formatted.split(' ').length > 3) break;
    }

    return formatted.trim();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newElapsedTimes: { [key: number]: string } = {};
      messages.forEach((msg, index) => {
        newElapsedTimes[index] = formatDisplayDuration(msg.displayTime);
      });
      setElapsedTimes(newElapsedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Scheduled Messages</h1>
        <p className="text-gray-600">Set and view scheduled messages</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:justify-between w-full max-w-6xl sm:space-x-8">
        <section className="bg-white p-6 rounded-lg shadow-lg flex-1 w-full sm:max-w-md overflow-auto max-h-[60vh] sm:max-h-[80vh] mb-6 sm:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Messages</h2>
          <ul className="space-y-3">
            {[...messages].reverse().map((msg, index) => (
              <li key={index} className="relative p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-lg font-semibold text-gray-800 break-words">
                  {msg.message.length > 100 && !expandedMessages[index]
                    ? `${msg.message.slice(0, 100)}...`
                    : msg.message}
                  {msg.message.length > 100 && (
                    <button
                      onClick={() => toggleExpandMessage(index)}
                      className="ml-2 text-blue-500 underline"
                    >
                      {expandedMessages[index] ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  <p>Created on: {new Date(msg.createdAt).toLocaleString()}</p>
                  <p>Displayed on: {new Date(msg.displayTime).toLocaleString()}</p>
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-mono">
                  {elapsedTimes[index]}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-md h-full sm:max-h-96">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Set a Timed Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message:</label>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-gray-700 font-medium mb-1">Time to Display:</label>
              <input
                type="datetime-local"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-150"
            >
              Submit
            </button>
          </form>
          {status && (
            <p className={`mt-4 text-center font-medium ${status.includes('⚠️') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MessagesPage;
