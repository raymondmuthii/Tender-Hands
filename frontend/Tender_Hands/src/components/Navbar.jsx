import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </li>
      );
    }

    switch (role) {
      case 'donor':
        return (
          <>
            <li style={styles.navItem}>
              <Link to="/donations" style={styles.navLink}>Donate</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/donation-history" style={styles.navLink}>Donation History</Link>
            </li>
          </>
        );
      case 'charity':
        return (
          <>
            <li style={styles.navItem}>
              <Link to="/charity-dashboard" style={styles.navLink}>Charity Dashboard</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/charity-application" style={styles.navLink}>Apply as a Charity</Link>
            </li>
          </>
        );
      case 'admin':
        return (
          <li style={styles.navItem}>
            <Link to="/admin-dashboard" style={styles.navLink}>Admin Dashboard</Link>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        {renderNavLinks()}
        {/* Contact link before logout button */}
        <li style={styles.navItem}>
          <Link to="/contact" style={styles.navLink}>Contact</Link> {/* Contact link */}
        </li>
        {isAuthenticated && (
          <li style={styles.navItem}>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// Inline styles object
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    padding: '0',
    margin: '0',
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Navbar;
