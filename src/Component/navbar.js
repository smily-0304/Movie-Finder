import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./logo.png";


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
        <Link to="/liked" style={styles.navItem}>
          <img src={logo} alt="Liked" style={styles.icon} /> {/* Add the icon here */}
        
        </Link>
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
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '25px', // Adjust the size of the icon as needed
    height: '25px',
    marginRight: '5px',
  },
};

export default Navbar;
