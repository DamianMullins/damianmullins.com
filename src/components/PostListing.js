import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PostTime from './PostTime'

import { post, link } from '../styles/post-listing.module.scss'

const PostListing = ({ slug, title, posted, description, timeToRead }) => (
  <article className={post}>
    <Link to={slug} className={link}>
      <h2>{title}</h2>

      <PostTime posted={posted} timeToRead={timeToRead} />

      <p>{description}</p>
    </Link>
  </article>
)

PostListing.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired
}

export default PostListing
