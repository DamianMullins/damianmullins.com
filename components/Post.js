import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/post.module.scss';

const Post = ({ path, title, posted }) => (
  <article className={styles.post}>
    <Link to={prefixLink(path)} className={styles.post_link}>
      <h2>{title}</h2>
      <time>{moment(posted).format('Do MMMM YYYY')}</time>
    </Link>
  </article>
);

Post.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired
};

export default Post;
