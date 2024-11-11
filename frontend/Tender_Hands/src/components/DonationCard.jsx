// src/components/DonationCard.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import Form from './Form';

const DonationCard = ({
  id,
  name,
  description,
  imageUrl,
  totalRaised = 0,
  donorCount = 0,
  category = 'General'
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  
  const predefinedAmounts = [10, 25, 50, 100];

  const formatAmount = (amount) => {
    return (Number(amount) || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'ksh'
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const donationData = {
      charityId: id,
      amount: parseFloat(donationAmount),
      isRecurring,
      frequency: isRecurring ? 'monthly' : null
    };
    
    // Uncomment when ready to implement
    // dispatch(createDonation(donationData));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
              {category}
            </div>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">
              <p className="text-gray-500">Total Raised</p>
              <p className="font-semibold text-purple-600">
                {formatAmount(totalRaised)}
              </p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Donors</p>
              <p className="font-semibold text-purple-600">
                {donorCount}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Donate Now
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Donate to ${name}`}
      >
        <Form onSubmit={handleDonate} buttonText="Complete Donation">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setDonationAmount(amount.toString())}
                  className={`
                    py-2 px-4 rounded-md border
                    ${donationAmount === amount.toString()
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-300 hover:border-purple-600'
                    }
                  `}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm text-gray-700">
                Custom Amount
              </label>
              <input
                type="number"
                id="amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="recurring" className="text-sm text-gray-700">
                Make this a monthly donation
              </label>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DonationCard;
