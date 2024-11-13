import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('email'); // Default to email
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor'); // Default to donor
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userName || !password || !role) {
      alert('Please enter all required fields.');
      return;
    }

    // Dispatch login action
    dispatch(login({ user: userName, contact, role, password }));

    alert('Login successful!');

    // Redirect to the home page based on the role
    navigate(`/home/${role}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <div style={styles.radioGroup}>
        <label style={styles.label}>
          <input
            type="radio"
            value="email"
            checked={contact === 'email'}
            onChange={() => setContact('email')}
            style={styles.radioButton}
          />
          Email
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            value="phone"
            checked={contact === 'phone'}
            onChange={() => setContact('phone')}
            style={styles.radioButton}
          />
          Phone Number
        </label>
      </div>
      <input
        type={contact === 'email' ? 'email' : 'tel'}
        placeholder={contact === 'email' ? 'Email' : 'Phone Number'}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
        <option value="donor">Donor</option>
        <option value="charity">Charity</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin} style={styles.button}>
        Log In
      </button>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    background: 'linear-gradient(to right, #00c6ff, #0072ff)', // Gradient background
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
  radioGroup: {
    display: 'flex',
    marginBottom: '20px',
  },
  label: {
    marginRight: '15px',
    fontSize: '1rem',
    color: '#fff',
  },
  radioButton: {
    marginRight: '5px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
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

export default LoginPage;
