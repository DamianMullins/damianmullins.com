import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { footer, links, link, noMargin } from '../styles/footer.module.scss'
import { l_container } from '../styles/layout.module.scss'

const Footer = ({
  author,
  authorEmail,
  githubUsername,
  twitterUsername,
  linkedInUsername
}) => (
  <div className={footer}>
    <div className={l_container}>
      <ul className={links}>
        {authorEmail && (
          <li className={link}>
            <a href={`mailto:${authorEmail}`} rel="external">
              Email
            </a>
          </li>
        )}
        {githubUsername && (
          <li className={link}>
            <a href={`https://github.com/${githubUsername}`} rel="external">
              GitHub
            </a>
          </li>
        )}
        {twitterUsername && (
          <li className={link}>
            <a href={`https://twitter.com/${twitterUsername}`} rel="external">
              Twitter
            </a>
          </li>
        )}
        {linkedInUsername && (
          <li className={link}>
            <a
              href={`https://www.linkedin.com/in/${linkedInUsername}`}
              rel="external">
              LinkedIn
            </a>
          </li>
        )}
      </ul>

      <p className={noMargin}>
        &copy; {author} {format(new Date(), 'yyyy')}
      </p>
    </div>
  </div>
)

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  authorEmail: PropTypes.string.isRequired,
  githubUsername: PropTypes.string.isRequired,
  twitterUsername: PropTypes.string.isRequired,
  linkedInUsername: PropTypes.string.isRequired
}

export default Footer
