import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import moment from 'moment';

import post from '../styles/post-listing.module.scss';

const PostListing = ({ slug, title, posted, excerpt, timeToRead }) => (
  <article className={post.post}>
    <Link to={slug} className={post.link}>
      <h2>{title}</h2>

      <p><time>{moment(posted).format('Do MMMM YYYY')}</time></p>
      <p>{excerpt}</p>
    </Link>
  </article>
);

PostListing.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired
};

export default PostListing;
