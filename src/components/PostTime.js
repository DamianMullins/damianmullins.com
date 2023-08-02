import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { post_meta } from '../styles/post.module.scss'

const PostTime = ({ posted, timeToRead }) => (
  <p className={post_meta}>
    <time>{format(new Date(posted), 'do MMMM yyyy')}</time> — {timeToRead}{' '}
    minute read
  </p>
)

PostTime.propTypes = {
  posted: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired
}

export default PostTime
