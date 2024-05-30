import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>
        <Link to="/" style={styles.titleLink}><i>Movie Finder</i></Link>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.navItem}>Home</Link>
        <Link to="/about" style={styles.navItem}>About</Link>
        <Link to="/contact" style={styles.navItem}>Contact</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '98%',
    padding: '10px 20px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginLeft: '20px', // Adjust as needed
    flex: 1, // Takes remaining space
  },
  titleLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
  },
  links: {
    marginRight: '20px', // Adjust as needed
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '16px',
  },
};

export default Navbar;
