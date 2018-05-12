import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import kebab from 'slugify';

const Tags = ({ tags }) =>
  tags.length > 0 && (
    <Fragment>
      <h2>Related tags</h2>

      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tags/${kebab(tag)}`}>{tag.toLowerCase()}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};

export default Tags;
