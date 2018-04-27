import React from 'react';
import { config } from 'config';

import styles from 'css/bio.module.scss';

const Bio = () => (
  <div className={styles.bio}>
    <p>
      <em>{config.authorBio}</em>
    </p>
  </div>
);

export default Bio;
