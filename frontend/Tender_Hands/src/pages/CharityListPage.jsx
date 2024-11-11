// pages/CharityListPage.js
import React, { useState } from 'react';
import DonationCard from '../components/DonationCard';
import Modal from '../components/Modal';
import Form from '../components/Form';

const CharityListPage = () => {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const charities = [
    {
      id: 1,
      name: "Charity 1",
      description: "Description of Charity 1",
      imageUrl: "/path/to/image.jpg"
    }
    // ... more charities
  ];

  const handleDonate = (charity) => {
    setSelectedCharity(charity);
    setIsDonateModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Charities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map(charity => (
          <DonationCard
            key={charity.id}
            {...charity}
            onDonate={() => handleDonate(charity)}
          />
        ))}
      </div>

      <Modal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        title={`Donate to ${selectedCharity?.name}`}
      >
        <Form
          onSubmit={(data) => {
            console.log('Donation data:', data);
            setIsDonateModalOpen(false);
          }}
          buttonText="Complete Donation"
        >
          {/* Form inputs */}
        </Form>
      </Modal>
    </div>
  );
};

export default CharityListPage;
