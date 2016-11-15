import React from 'react';
import moment from 'moment';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/footer.module.scss';
import layout from 'css/layout.module.scss';

class Footer extends React.Component {
  render () {
    return (
      <div className={styles.footer}>
        <div className={layout.l_container}>
          <ul className={styles.footer_links}>
            <li className={styles.footer_link}><a href={`mailto:${config.authorEmail}`} rel="external">Email</a></li>
            <li className={styles.footer_link}><a href={`https://github.com/${config.githubUsername}`} rel="external">GitHub</a></li>
            <li className={styles.footer_link}><a href={`https://twitter.com/${config.twitterUsername}`} rel="external">Twitter</a></li>
            <li className={styles.footer_link}><a href={`https://www.linkedin.com/in/${config.linkedInUsername}`} rel="external">LinkedIn</a></li>
          </ul>

          <p>{moment().format('YYYY')} {config.authorName}</p>
        </div>
      </div>
    );
  };
};

export default Footer;
