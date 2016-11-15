import React from 'react';
import { Link } from 'react-router';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import includes from 'lodash/includes';
import { prefixLink } from 'gatsby-helpers';
import Helmet from "react-helmet";
import { config } from 'config';
import Bio from 'components/Bio';
import Post from 'components/Post';

import 'kickoff-grid.css';
import 'css/styles.scss';
import layout from 'css/layout.module.scss';

class BlogIndex extends React.Component {
  render() {
    const { route } = this.props;

    const sortedPages = sortBy(route.pages, page => get(page, 'data.date'))
      .reverse()
      .map(page => {
        if (get(page, 'file.ext') === 'md' && !includes(page.path, '/404') && !get(page, 'data.draft')) {
          const title = get(page, 'data.title') || page.path;
          const posted = get(page, 'data.date');

          return (<Post
              key={page.path}
              path={page.path}
              title={title}
              posted={posted} />
          );
        };
      });

    return (
      <div className={layout.l_container}>
        <Helmet
          title={config.blogTitle}
          meta={[
            { "name": "description", "content": config.description }
          ]} />

        <Bio />

        <section>
          {sortedPages}
        </section>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object
};

export default BlogIndex;
