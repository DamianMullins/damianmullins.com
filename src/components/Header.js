import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Nav from '../components/Nav';

import styles from '../styles/header.module.scss';
import layout from '../styles/layout.module.scss';
import profilePic from '../assets/images/profile-pic--large.png';

const Header = ({ modifier }) => (
  <header className={styles.header}>
    <Nav />

    <Link to="/" className={styles.link}>
      <img
        src={profilePic}
        alt="Navigate to homepage"
        className={styles.image}
      />
    </Link>
  </header>
);

Header.propTypes = {
  showLarge: PropTypes.bool
};

export default Header;
