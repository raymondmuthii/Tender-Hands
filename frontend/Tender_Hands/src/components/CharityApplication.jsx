import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCharityDetails } from '../redux/charitySlice';

const CharityApplication = () => {
  const [charityName, setCharityName] = useState('');
  const [charityDescription, setCharityDescription] = useState('');
  const [amountToRaise, setAmountToRaise] = useState('');
  const [faqOpen, setFaqOpen] = useState(null); // State to track open FAQs
  const dispatch = useDispatch();

  const handleApply = () => {
    // Check if all fields are filled out
    if (!charityName || !charityDescription || !amountToRaise) {
      alert('Please fill out all fields.');
      return;
    }

    // Dispatch the new charity details to the store, but mark it as "pending" initially
    dispatch(setCharityDetails({
      name: charityName,
      description: charityDescription,
      amountToRaise,
      status: 'pending', // Mark as pending until admin approves
    }));
    alert('Charity application submitted!');
  };

  // Toggle FAQ visibility
  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index); // Toggle open/close
  };

  return (
    <div>
      <h2>Apply to be a Charity</h2>
      <input
        type="text"
        placeholder="Charity Name"
        value={charityName}
        onChange={(e) => setCharityName(e.target.value)}
      />
      <textarea
        placeholder="Charity Description"
        value={charityDescription}
        onChange={(e) => setCharityDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount to Raise"
        value={amountToRaise}
        onChange={(e) => setAmountToRaise(e.target.value)}
      />
      <button onClick={handleApply}>Submit Application</button>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div>
          <div onClick={() => handleFaqToggle(0)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ❓ How are charities vetted?
          </div>
          {faqOpen === 0 && (
            <div>
              Charities go through a comprehensive review process where they are evaluated based on several criteria, such as their mission, impact, financial health, and transparency. This helps ensure that donations are going to reputable organizations.
            </div>
          )}
        </div>
        <div>
          <div onClick={() => handleFaqToggle(1)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ❔ Can I suggest a charity for approval?
          </div>
          {faqOpen === 1 && (
            <div>
              Yes, you can suggest a charity for approval. There’s usually a form or contact option on the platform where you can provide details about the charity you want to recommend.
            </div>
          )}
        </div>
        <div>
          <div onClick={() => handleFaqToggle(2)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ❓ What happens if a charity doesn't meet the criteria?
          </div>
          {faqOpen === 2 && (
            <div>
              If a charity doesn't meet the criteria, it might be rejected during the review process. The platform will typically inform the charity of the reasons for rejection and may offer guidance on areas they need to improve to meet the necessary standards.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityApplication;
