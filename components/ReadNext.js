import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import includes from 'lodash/includes';
import find from 'lodash/find';
import truncate from 'lodash/truncate';

class ReadNext extends React.Component {
  render () {
    const { pages, post } = this.props;
    const { readNext } = post;
    let nextPost;

    if (readNext) {
      nextPost = find(pages, (page) =>
        includes(page.path, readNext)
      );
    }

    if (!nextPost) {
      return React.createElement('noscript', null);
    } else {
      nextPost = find(pages, (page) =>
        includes(page.path, readNext.slice(1, -1))
      );
      
      const html = nextPost.data.body;
      const body = truncate(html.replace(/<[^>]*>/g, ''), {
        'length': 200
      });

      return (
        <div>
          <hr />

          <h6 style={{ margin: 0,  textTransform: 'uppercase' }}>
            Read this next:
          </h6>

          <h3 style={{ marginTop: 0 }}>
            <Link
              to={{
                pathname: prefixLink(nextPost.path),
                query: {
                  readNext: true,
                }
              }}>
              {nextPost.data.title}
            </Link>
          </h3>
          <p>{body}</p>
          <hr />
        </div>
      )
    }
  }
};

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array
};

export default ReadNext;
