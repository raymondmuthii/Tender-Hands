import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDonors, setTotalDonations, setInventory, addBeneficiary, addStory } from '../redux/charitySlice';

const CharityDashboard = () => {
  const dispatch = useDispatch();
  const { charities, donors, totalDonations, beneficiaries, inventory, stories } = useSelector(state => state.charity);
  const donationHistory = useSelector(state => state.donation.donationHistory);  // Add donation history here

  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryContent, setNewStoryContent] = useState('');
  const [selectedStoryCharityId, setSelectedStoryCharityId] = useState('');
  const [selectedBeneficiaryCharityId, setSelectedBeneficiaryCharityId] = useState('');
  const [newBeneficiaryName, setNewBeneficiaryName] = useState('');
  const [newBeneficiaryAge, setNewBeneficiaryAge] = useState('');

  useEffect(() => {
    // Simulate fetching data from API
    dispatch(setDonors([
      { id: 1, name: 'John Doe', amount: 100, anonymous: false, charityId: 1 },
      { id: 2, name: 'Jane Doe', amount: 200, anonymous: true, charityId: 2 },
    ]));
    dispatch(setTotalDonations(300));
    dispatch(setInventory([{ id: 1, item: 'Food Packages', quantity: 50 }]));
  }, [dispatch]);

  const handleAddStory = () => {
    if (!newStoryTitle || !newStoryContent || !selectedStoryCharityId) {
      alert('Please fill out all fields: title, content, and select a charity.');
      return;
    }

    const selectedCharity = charities.find(c => c.id === selectedStoryCharityId);

    if (!selectedCharity) {
      alert('Selected charity does not exist.');
      return;
    }

    if (selectedCharity.status !== 'approved') {
      alert('Your charity has not been approved yet.');
      return;
    }

    // Dispatch the action to add the story
    dispatch(addStory({ charityId: selectedStoryCharityId, title: newStoryTitle, content: newStoryContent }));

    setNewStoryTitle('');
    setNewStoryContent('');
    alert('Story added successfully!');
  };

  const handleAddBeneficiary = () => {
    if (!newBeneficiaryName || !newBeneficiaryAge || !selectedBeneficiaryCharityId) {
      alert('Please fill out all fields: name, age, and select a charity.');
      return;
    }

    const selectedCharity = charities.find(c => c.id === selectedBeneficiaryCharityId);

    if (!selectedCharity) {
      alert('Selected charity does not exist.');
      return;
    }

    if (selectedCharity.status !== 'approved') {
      alert('Your charity has not been approved yet.');
      return;
    }

    // Dispatch the action to add the beneficiary
    dispatch(addBeneficiary({
      charityId: selectedBeneficiaryCharityId,
      name: newBeneficiaryName,
      age: newBeneficiaryAge
    }));

    setNewBeneficiaryName('');
    setNewBeneficiaryAge('');
    alert('Beneficiary added successfully!');
  };

  // New function to show donations for the selected charity
  const getDonationsForCharity = (charityId) => {
    return donationHistory.filter(donation => donation.campaignTitle === charityId);
  };

  // Function to show beneficiaries for a specific charity
  const getBeneficiariesForCharity = (charityId) => {
    return beneficiaries.filter(beneficiary => beneficiary.charityId === charityId);
  };

  // Function to show stories for a specific charity
  const getStoriesForCharity = (charityId) => {
    return stories[charityId] || [];
  };

  return (
    <div>
      <h2>Charity Dashboard</h2>
      
      <h3>Charities</h3>
      {charities.length > 0 ? (
        <ul>
          {charities.map(charity => (
            <li key={charity.id}>
              <h4>{charity.name}</h4>
              <p>{charity.description}</p>
              <p>Status: {charity.status}</p>
              
              {/* Display Donors */}
              <div>
                <h5>Donors</h5>
                <ul>
                  {donors.filter(donor => donor.charityId === charity.id).map(donor => (
                    <li key={donor.id}>
                      <p>{donor.anonymous ? 'Anonymous' : donor.name} - ${donor.amount}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Display Total Donations */}
              <div>
                <h5>Total Donations: ${totalDonations}</h5>
              </div>

              {/* Show Inventory */}
              <div>
                <h5>Inventory</h5>
                <ul>
                  {inventory.filter(item => item.charityId === charity.id).map(item => (
                    <li key={item.id}>
                      {item.item}: {item.quantity} available
                    </li>
                  ))}
                </ul>
              </div>

              {/* Show Stories */}
              <div>
                <h5>Stories</h5>
                {getStoriesForCharity(charity.id).length > 0 ? (
                  <ul>
                    {getStoriesForCharity(charity.id).map((story, index) => (
                      <li key={index}>
                        <h6>{story.title}</h6>
                        <p>{story.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No stories available.</p>
                )}
              </div>

              {/* Show Donations for this charity */}
              <div>
                <h5>Donations</h5>
                <ul>
                  {getDonationsForCharity(charity.id).map((donation, index) => {
                    const donor = donors.find(d => d.id === donation.donorId);
                    return (
                      <li key={index}>
                        <p>Donor: {donor ? (donor.anonymous ? 'Anonymous' : donor.name) : 'Unknown'}</p>
                        <p>Amount: ${donation.amount}</p>
                        <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Show Beneficiaries for this charity */}
              <div>
                <h5>Beneficiaries</h5>
                <ul>
                  {getBeneficiariesForCharity(charity.id).map((beneficiary, index) => (
                    <li key={index}>
                      <p>Name: {beneficiary.name}</p>
                      <p>Age: {beneficiary.age}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No charities available.</p>
      )}

      {/* Add Beneficiary Form */}
      <h3>Add a Beneficiary</h3>
      <div>
        <label>
          Select Charity:
          <select onChange={(e) => setSelectedBeneficiaryCharityId(e.target.value)} value={selectedBeneficiaryCharityId}>
            <option value="">-- Select a charity --</option>
            {charities.map(charity => (
              <option key={charity.id} value={charity.id}>{charity.name}</option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="Beneficiary Name"
          value={newBeneficiaryName}
          onChange={(e) => setNewBeneficiaryName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Beneficiary Age"
          value={newBeneficiaryAge}
          onChange={(e) => setNewBeneficiaryAge(e.target.value)}
        />
        <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
      </div>

      {/* Add a Story Form */}
      <h3>Add a Story</h3>
      <div>
        <label>
          Select Charity:
          <select onChange={(e) => setSelectedStoryCharityId(e.target.value)} value={selectedStoryCharityId}>
            <option value="">-- Select a charity --</option>
            {charities.map(charity => (
              <option key={charity.id} value={charity.id}>{charity.name}</option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="Story Title"
          value={newStoryTitle}
          onChange={(e) => setNewStoryTitle(e.target.value)}
        />
        <textarea
          placeholder="Story Content"
          value={newStoryContent}
          onChange={(e) => setNewStoryContent(e.target.value)}
        />
        <button onClick={handleAddStory}>Add Story</button>
      </div>
    </div>
  );
};

export default CharityDashboard;
