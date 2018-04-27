import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import includes from 'lodash/includes';
import find from 'lodash/find';
import truncate from 'lodash/truncate';

const ReadNext = ({ pages, post }) => {
  const { readNext } = post;
  let nextPost;

  if (readNext) {
    nextPost = find(pages, page => includes(page.path, readNext));
  }

  if (!nextPost) {
    return null;
  } else {
    nextPost = find(pages, page => includes(page.path, readNext.slice(1, -1)));

    const html = nextPost.data.body;
    const body = truncate(html.replace(/<[^>]*>/g, ''), {
      length: 200
    });

    return (
      <div>
        <hr />

        <h6 style={{ margin: 0, textTransform: 'uppercase' }}>
          Read this next:
        </h6>

        <h3 style={{ marginTop: 0 }}>
          <Link
            to={{
              pathname: prefixLink(nextPost.path),
              query: {
                readNext: true
              }
            }}
          >
            {nextPost.data.title}
          </Link>
        </h3>
        <p>{body}</p>
        <hr />
      </div>
    );
  }
};

ReadNext.propTypes = {
  post: PropTypes.object.isRequired,
  pages: PropTypes.array
};

export default ReadNext;
