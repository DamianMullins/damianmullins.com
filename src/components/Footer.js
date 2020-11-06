import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import footer from '../styles/footer.module.scss';
import layoutStyles from '../styles/layout.module.scss';

const Footer = ({
  author,
  authorEmail,
  githubUsername,
  twitterUsername,
  linkedInUsername
}) => (
  <div className={footer.footer}>
    <div className={layoutStyles.l_container}>
      <ul className={footer.links}>
        {authorEmail && (
          <li className={footer.link}>
            <a href={`mailto:${authorEmail}`} rel="external">
              Email
            </a>
          </li>
        )}
        {githubUsername && (
          <li className={footer.link}>
            <a href={`https://github.com/${githubUsername}`} rel="external">
              GitHub
            </a>
          </li>
        )}
        {twitterUsername && (
          <li className={footer.link}>
            <a href={`https://twitter.com/${twitterUsername}`} rel="external">
              Twitter
            </a>
          </li>
        )}
        {linkedInUsername && (
          <li className={footer.link}>
            <a
              href={`https://www.linkedin.com/in/${linkedInUsername}`}
              rel="external"
            >
              LinkedIn
            </a>
          </li>
        )}
      </ul>

      <p className={footer.noMargin}>
        &copy; {author} {format(new Date(), 'yyyy')}
      </p>
    </div>
  </div>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  authorEmail: PropTypes.string.isRequired,
  githubUsername: PropTypes.string.isRequired,
  twitterUsername: PropTypes.string.isRequired,
  linkedInUsername: PropTypes.string.isRequired
};

export default Footer;
