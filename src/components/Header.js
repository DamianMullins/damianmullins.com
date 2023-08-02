import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { header, link, image } from '../styles/header.module.scss'
import profilePic from '../assets/images/profile-pic.avif'

const Header = ({ modifier }) => (
  <header className={header}>
    <Link to="/" className={link}>
      <img
        src={profilePic}
        alt="Navigate to homepage"
        className={image}
        height="54px"
        width="54px"
      />
    </Link>
  </header>
)

Header.propTypes = {
  showLarge: PropTypes.bool
}

export default Header
