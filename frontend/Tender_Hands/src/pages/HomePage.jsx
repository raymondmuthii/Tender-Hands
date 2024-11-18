import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  // Donation data for the bar graph
  const donationData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Example months
    datasets: [
      {
        label: 'Total Donations (KSh)',
        data: [10000, 25000, 35000, 45000, 55000], // Example donation amounts
        backgroundColor: '#27ae60', // Green color for bars
        borderColor: '#2c3e50',
        borderWidth: 1,
      },
    ],
  };

  const donationOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Donation Growth Over Time',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `KSh ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderHomeContent = () => {
    if (!isAuthenticated) {
      return (
        <div style={contentStyle}>
          <h1 style={mainTitleStyle}>Welcome to Our Donation Platform</h1>
          <p style={descriptionStyle}>Your contributions can change lives!</p>
          <p style={descriptionStyle}>Join our community and make a lasting impact.</p>

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
          </div>
        </div>
      );
    }

    switch (role) {
      case 'donor':
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome, Donor!</h1>
            <p style={descriptionStyle}>Your generosity brings hope to others.</p>
            <p style={descriptionStyle}>Browse campaigns and donate to causes you care about.</p>
            <div>
              <Bar data={donationData} options={donationOptions} />
            </div>
            <Link to="/donation-history">
              <button
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                View Donation History
              </button>
            </Link>
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return <div style={containerStyle}>{renderHomeContent()}</div>;
};

export default Home;
