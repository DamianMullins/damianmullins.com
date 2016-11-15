import React from 'react';
import { Link } from 'react-router';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/header.module.scss';

import profilePic from 'img/profile-pic--large.png';

class Header extends React.Component {
  render () {
    const { modifier } = this.props;
    const modifierClassName = modifier ? styles[`header__${modifier}`] : '';

    return (
      <div className={`${styles.header} ${modifierClassName}`}>
        <Link
            to={prefixLink('/')}
            className={styles.header_link}>
          <img
            src={prefixLink(profilePic)}
            alt={config.blogTitle}
            className={styles.header_image} />
        </Link>
      </div>
    );
  };
};

React.propTypes = {
  showLarge: React.PropTypes.bool
};

export default Header;
