import Image from 'next/image';
import React, { useState } from 'react';

interface PicturesCardProps {
  onClose: () => void;
}

const PicturesCard: React.FC<PicturesCardProps> = ({ onClose }) => {
  const pictures = Array.from({ length: 15 }, (_, i) => `/img/img${i + 1}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-center">📸 Our Memories 📸</h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-x-12 gap-y-1">
            {pictures.map((picture, index) => (
              <Image
                key={index}
                src={picture}
                width={96}
                height={96}
                alt={`Picture ${index + 1}`}
                className="w-24 h-24 object-cover rounded border-4 border-pink-300 shadow cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedImage(picture)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
          <div className="relative max-w-full max-h-full w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Selected"
              layout="intrinsic"
              width={800}
              height={600}
              className="object-contain rounded shadow-lg max-w-full max-h-full"
            />
            {/* X button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-300 transition"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicturesCard;
