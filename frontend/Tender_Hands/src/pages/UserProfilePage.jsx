// src/pages/UserProfilePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfilePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome, [User's Name]</h1>
        <button>Edit Profile</button>
      </header>
      <section>
        <h2>Profile Information</h2>
        <p>Name: [User's Name]</p>
        <p>Email: [User's Email]</p>
        <button>Edit Information</button>
      </section>
      {/* Add other profile sections here */}
    </div>
  );
};

// Add this export default statement
export default UserProfilePage;
