import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import PostTime from './PostTime';

import post from '../styles/post-listing.module.scss';

const PostListing = ({ slug, title, posted, description, timeToRead }) => (
  <article className={post.post}>
    <Link to={slug} className={post.link}>
      <h2 onClick={() => throw new Error('sss')}>{title}</h2>

      <PostTime
        posted={posted}
        timeToRead={timeToRead} />

      <p>{description}</p>
    </Link>
  </article>
);

PostListing.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired
};

export default PostListing;
