import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';  // Assuming you're using a library for the bar chart

const Home = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const approvedCharities = useSelector((state) => state.charity.charities); // Access approved charities from Redux store

  // State to manage the visibility of the dropdown and FAQ answers
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null); // State to track which FAQ is clicked

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Toggle FAQ answer visibility
  const toggleFAQAnswer = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index); // Toggle between showing and hiding the answer
  };

  // Donation data for the Bar chart (assuming you're using Chart.js or similar library)
  const donationData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Donations',
        data: [5000, 10000, 15000, 20000, 25000],  // Example data
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const donationOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const containerStyle = {
    backgroundColor: '#f4f8fb',
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundImage: 'url("https://source.unsplash.com/1600x900/?donate")', // Adding a background image for impact
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    opacity: 0.9, // Make it a bit transparent to let the background show through
  };

  const mainTitleStyle = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2c3e50',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)', // Add a subtle text shadow for better readability
  };

  const descriptionStyle = {
    fontSize: '1.4rem',
    color: '#34495e',
    marginBottom: '20px',
    lineHeight: '1.8',
    fontStyle: 'italic',
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '1.1rem',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginTop: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#c0392b',
    transform: 'scale(1.05)', // Button scales up slightly on hover
  };

  const encouragingMessageStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#27ae60', // Green for a positive, encouraging message
    marginTop: '20px',
  };

  // Render content for donor
  const renderDonorContent = () => {
    return (
      <div style={contentStyle}>
        <h1 style={mainTitleStyle}>Welcome, Donor!</h1>
        <p style={descriptionStyle}>Your generosity brings hope to others.</p>

        <h2 style={mainTitleStyle}>Donation Process Overview</h2>
        <p>1. Select Donation Amount</p>
        <p>2. Choose Payment Method</p>
        <p>3. Confirm Donation</p>

        {/* List of Charities to Donate To */}
      <h2 style={mainTitleStyle}>Choose a Charity to Support</h2>
      {approvedCharities && approvedCharities.length > 0 ? (
        <div>
          {approvedCharities.map((charity) => (
            <div key={charity.id} style={{ marginBottom: '20px' }}>
              <h3>{charity.name}</h3>
              <p>{charity.description}</p>
              <Link to={`/donate/${charity.id}`}>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                  Donate Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No approved charities available at the moment.</p>
      )}

        <h2 style={mainTitleStyle}>Step-by-step Account Setup guidance</h2>
        <p>1. Create an Account</p>
        <p>2. Discover our available services</p>
        <p>3. Choose a cause to support</p>

        <h2 style={mainTitleStyle}>Donation Statistics</h2>
        <p>Total Donated: KSh100,000</p>

        {/* Bar chart showing donation growth */}
        <Bar data={donationData} options={donationOptions} />

        <p>95% Success Rate</p>
        <p>Growth: +5% since last month, +15% YoY</p>

        {/* Link to the donation history page */}
        <Link to="/donation-history">
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Donation History
          </button>
        </Link>
      </div>
    );
  };

  // Render content for admin
  const renderAdminContent = () => {
    const pendingCharities = approvedCharities.filter(charity => charity.status === 'pending');
    const rejectedCharities = approvedCharities.filter(charity => charity.status === 'rejected');
  
    return (
      <div style={contentStyle}>
        <h1 style={mainTitleStyle}>Welcome, Admin!</h1>
        <p style={descriptionStyle}>You are at the heart of managing this platform and making a global impact.</p>

        {/* Display Metrics & Insights */}
        <h2 style={mainTitleStyle}>Metrics & Insights</h2>
        <p>Review essential statistics about the charities, donations, and applications:</p>
        <ul>
          <li>Total Donations: $125,000</li>
          <li>Pending Applications: 8</li>
          <li>Approved Charities: 20</li>
          <li>Donations by Category: Education (50%), Health (30%), Environment (20%)</li>
        </ul>

        <h2 style={mainTitleStyle}>Application Pipeline</h2>
        <p>A visual representation of charity applications status:</p>
        <Bar data={donationData} options={donationOptions} />

        {/* Application Management */}
        <h2 style={mainTitleStyle}>Application Management</h2>
        <p>Manage charity applications:</p>
        <div style={{ marginTop: '20px' }}>
          {/* Pending Charities Section */}
      <h2 style={mainTitleStyle}>Pending Charity </h2>
      <ul>
        {pendingCharities.length > 0 ? (
          pendingCharities.map(charity => (
            <li key={charity.id}>
              <h3>{charity.name}</h3>
              <p>{charity.description}</p>
              <button style={buttonStyle}>Approve</button>
              <button style={buttonStyle}>Reject</button>
            </li>
          ))
        ) : (
          <p>No pending applications.</p>
        )}
      </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          {/* Approved Charities Section */}
      <h2 style={mainTitleStyle}>Approved Charities</h2>
      <ul>
        {approvedCharities.length > 0 ? (
          approvedCharities.map(charity => (
            <li key={charity.id}>
              <h3>{charity.name}</h3>
              <p>{charity.description}</p>
              <button style={buttonStyle}>View Charity</button>
            </li>
          ))
        ) : (
          <p>No approved charities yet.</p>
        )}
      </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
        <h2 style={mainTitleStyle}>Rejected Charities</h2>
      <ul>
        {rejectedCharities.length > 0 ? (
          rejectedCharities.map(charity => (
            <li key={charity.id}>
              <h3>{charity.name}</h3>
              <p>{charity.description}</p>
              <button style={buttonStyle}>Delete</button>
            </li>
          ))
        ) : (
          <p>No rejected charities.</p>
        )}
      </ul>
        </div>

        {/* Admin Actions */}
        <h2 style={mainTitleStyle}>Admin Actions</h2>
        <p>Take actions for charity applications:</p>
        <div>
          <button style={buttonStyle}>Request Additional Information</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Approval Notes</h3>
          <textarea rows="4" style={{ width: '100%', padding: '10px' }} placeholder="Enter notes here"></textarea>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button style={buttonStyle}>Approve</button>
          <button style={buttonStyle}>Reject</button>
        </div>
      </div>
    );
  };

  // Render content based on role
  const renderHomeContent = () => {
    if (!isAuthenticated) {
      return (
        <div style={contentStyle}>
          <h1 style={mainTitleStyle}>Welcome to Our Donation Platform</h1>
          <p style={descriptionStyle}>Your contributions can change lives!</p>
          <p style={descriptionStyle}>Join our community and make a lasting impact.</p>
          
          <h1 style={mainTitleStyle}>Empower Change:Donate Regulary,make an impact</h1>
          <p style={descriptionStyle}>Join us in our mission to support those in need by setting up a reccuring donation.Your consistent contributions can transform lives and foster lasting changes!</p>
          
          <h1 style={mainTitleStyle}>Impact <br></br>Make a Difference with Regular Donations</h1>
          <p style={descriptionStyle}>Steady support <br></br>Your ongoing contributions empower charities to plan effectively and achieve their missions.Your consistent support creates lasting change in the community!</p>
          
          

          {/* Dropdown button */}
          <div style={{ position: 'relative' }}>
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={toggleDropdown}
            >
              Log In / Sign Up
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div style={dropdownMenuStyle}>
                <Link to="/login/charity">
                  <button
                    style={dropdownButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                  >
                    Log In as Charity
                  </button>
                </Link>
                <Link to="/login/donor">
                  <button
                    style={dropdownButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                  >
                    Log In as Donor
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      );
    }

    switch (role) {
      case 'donor':
        return renderDonorContent();
      case 'charity':
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome to our Charities Page</h1>
            <p style={descriptionStyle}>Explore and support various charitable causes.</p>

            <h2 style={{ ...mainTitleStyle, fontSize: '2rem', marginTop: '40px' }}>Featured Charities</h2>
            <p style={descriptionStyle}>Browse through our approved charities:</p>

            {/* Dynamically render approved charities */}
            {approvedCharities && approvedCharities.length > 0 ? (
              approvedCharities.map((charity) => (
                <div key={charity.id} style={{ marginBottom: '30px' }}>
                  <h3>{charity.name}</h3>
                  <p>{charity.description}</p>
                </div>
              ))
            ) : (
              <p>No approved charities available at the moment.</p>
            )}

            <h2 style={{ ...mainTitleStyle, fontSize: '2rem', marginTop: '40px' }}>FAQ (Frequently Asked Questions)</h2>
            <div style={descriptionStyle}>
              <div onClick={() => toggleFAQAnswer(0)} style={faqQuestionStyle}>
                ❓ <strong>How are charities vetted?</strong>
              </div>
              {activeFAQ === 0 && (
                <div style={faqAnswerStyle}>
                  Charities go through a comprehensive review process where they are evaluated based on several criteria, such as their mission, impact, financial health, and transparency. This ensures that donations are going to reputable organizations.
                </div>
              )}

              <div onClick={() => toggleFAQAnswer(1)} style={faqQuestionStyle}>
                ❔ <strong>Can I suggest a charity for approval?</strong>
              </div>
              {activeFAQ === 1 && (
                <div style={faqAnswerStyle}>
                  Yes, you can suggest a charity for approval. There is usually a form or contact option on the platform where you can provide details about the charity you want to recommend.
                </div>
              )}

              <div onClick={() => toggleFAQAnswer(2)} style={faqQuestionStyle}>
                ❓ <strong>What happens if a charity doesn't meet the criteria?</strong>
              </div>
              {activeFAQ === 2 && (
                <div style={faqAnswerStyle}>
                  If a charity doesn't meet the criteria, it might be rejected during the review process. The platform will typically inform the charity of the reasons for rejection and may offer guidance on areas they need to improve to meet the necessary standards.
                </div>
              )}
            </div>
            <p style={encouragingMessageStyle}>Together, we can change the world, one charity at a time!</p>
            <Link to="/charity-application">
              <button
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Apply Now
              </button>
            </Link>
          </div>
        );
      case 'admin':
        return renderAdminContent(); // Show the admin-specific content
      default:
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome to Our Donation Platform</h1>
            <p style={descriptionStyle}>Contribute today, whether you're donating or opening a charity.</p>
            <p style={encouragingMessageStyle}>Together, we can create a ripple effect of kindness!</p>
            <Link to="/explore">
              <button
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Explore Now
              </button>
            </Link>
          </div>
        );
    }
  };

  return <div style={containerStyle}>{renderHomeContent()}</div>;
};

// FAQ question style
const faqQuestionStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#2980b9',
  cursor: 'pointer',
  marginBottom: '10px',
};

// FAQ answer style
const faqAnswerStyle = {
  fontSize: '1.1rem',
  color: '#34495e',
  marginBottom: '20px',
  paddingLeft: '20px',
};

export default Home;