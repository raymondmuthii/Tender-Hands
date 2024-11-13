import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  
  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
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
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  };

  const mainTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2c3e50',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: '#34495e',
    marginBottom: '20px',
    lineHeight: '1.5',
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '1rem',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px', // Adds space between buttons
  };

  const buttonHoverStyle = {
    backgroundColor: '#c0392b',
  };

  const renderHomeContent = () => {
    if (!isAuthenticated) {
      return (
        <div style={contentStyle}>
          <h1 style={mainTitleStyle}>Welcome to Our Donation Platform</h1>
          <p style={descriptionStyle}>Your contributions can make a difference!</p>
          <p style={descriptionStyle}>Please log in to start making a difference.</p>

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
                <Link to="/login">
                  <button
                    style={dropdownButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                  >
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    style={dropdownButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                  >
                    Sign Up
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
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome, Donor!</h1>
            <p style={descriptionStyle}>Thank you for your generosity.</p>
            <p style={descriptionStyle}>Browse campaigns and donate to causes you care about.</p>
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
      case 'charity':
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome, Charity!</h1>
            <p style={descriptionStyle}>You can apply to get listed and manage your donation campaigns.</p>
            <p style={descriptionStyle}>Your work helps make the world a better place.</p>
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
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome, Admin!</h1>
            <p style={descriptionStyle}>You can manage the platform, view statistics, and oversee all donations and campaigns.</p>
            <Link to="/admin-dashboard">
              <button
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Manage Dashboard
              </button>
            </Link>
          </div>
        );
      default:
        return (
          <div style={contentStyle}>
            <h1 style={mainTitleStyle}>Welcome to Our Donation Platform</h1>
            <p style={descriptionStyle}>Your contributions can make a difference!</p>
            <p style={descriptionStyle}>Browse our campaigns and make a donation today (if you are a donor), or apply as a charity (if you're a charity).</p>
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

// Dropdown menu style
const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  width: '200px',
  padding: '10px 0',
  borderRadius: '4px',
};

// Dropdown button style
const dropdownButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  fontSize: '1rem',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginBottom: '5px',
};

export default Home;
