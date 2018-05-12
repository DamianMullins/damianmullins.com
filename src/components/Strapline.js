import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/strapline.module.scss';

const Strapline = ({ text }) => (
  <div className={styles.strapline}>
    <h1 className={styles.heading}>{text}</h1>
  </div>
);

Strapline.propTypes = {
  text: PropTypes.string.isRequired
};

export default Strapline;
