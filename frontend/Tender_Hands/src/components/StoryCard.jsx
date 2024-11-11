// components/StoryCard.js
import React, { useState } from 'react';
import Modal from './Modal';

const StoryCard = ({
  title,
  preview,
  content,
  imageUrl,
  date,
  charityName,
  beneficiaryName
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Card Image */}
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Card Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <span className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {preview}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-600">
              {charityName}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Full Story Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        size="lg"
      >
        <div className="space-y-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{charityName}</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          
          <div className="prose max-w-none">
            <p>{content}</p>
          </div>
          
          {beneficiaryName && (
            <div className="mt-4 text-sm text-gray-600">
              Story of: {beneficiaryName}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default StoryCard;
