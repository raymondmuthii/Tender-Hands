import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('donor');  // Default to donor
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSignup = () => {
    if (!userName || !email || !phoneNumber || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    // Alert for successful signup (this is where you'd integrate the signup API)
    alert('Signup successful!');
    
    // Redirect to the login page
    navigate('/login');  // Redirect to the login page, but don't log in the user
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        style={styles.select}
      >
        <option value="donor">Donor</option>
        <option value="charity">Charity</option>
        <option value="admin">Admin</option>
      </select>
      <button 
        onClick={handleSignup} 
        style={styles.button}
      >
        Sign Up
      </button>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', // Gradient background
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '1.2rem',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    width: '100%',
  },
};

export default SignupPage;
