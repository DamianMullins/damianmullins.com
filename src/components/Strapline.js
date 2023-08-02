import React from 'react'
import PropTypes from 'prop-types'

import { strapline, heading } from '../styles/strapline.module.scss'

const Strapline = ({ text }) => (
  <div className={strapline}>
    <h1 className={heading}>{text}</h1>
  </div>
)

Strapline.propTypes = {
  text: PropTypes.string.isRequired
}

export default Strapline
