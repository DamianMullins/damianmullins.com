import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import styles from 'css/post.module.scss';

class Post extends React.Component {
  render() {
    const { path, title, posted } = this.props;

    return (
      <article className={styles.post}>
        <Link to={prefixLink(path)} className={styles.post_link}>
          <h2>{title}</h2>
          <time>{moment(posted).format('Do MMMM YYYY')}</time>
        </Link>
      </article>
    );
  }
}

React.propTypes = {
  path: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  posted: React.PropTypes.object.isRequired
};

export default Post;
