import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/header.module.scss';
import profilePic from 'img/profile-pic--large.png';

const Header = ({ modifier }) => (
  <div
    className={`${styles.header} ${
      modifier ? styles[`header__${modifier}`] : ''
    }`}
  >
    <Link to={prefixLink('/')} className={styles.header_link}>
      <img
        src={prefixLink(profilePic)}
        alt={config.blogTitle}
        className={styles.header_image}
      />
    </Link>
  </div>
);

Header.propTypes = {
  showLarge: PropTypes.bool
};

export default Header;
