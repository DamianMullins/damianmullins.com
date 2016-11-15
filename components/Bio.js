import React from 'react';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/bio.module.scss';

class Bio extends React.Component {
  render () {
    return (
      <div className={styles.bio}>
        <p><em>{config.authorBio}</em></p>
      </div>
    );
  };
};

export default Bio;
