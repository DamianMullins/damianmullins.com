import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import includes from 'lodash/includes';
import Helmet from 'react-helmet';
import { config } from 'config';
import Bio from 'components/Bio';
import Post from 'components/Post';

import 'kickoff-grid.css';
import 'css/styles.scss';
import layout from 'css/layout.module.scss';

const BlogIndex = ({ route }) => (
  <div className={layout.l_container}>
    <Helmet
      title={config.blogTitle}
      meta={[{ name: 'description', content: config.authorBio }]}
      script={[
        {
          innerHTML:
            "Raven.config('https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@sentry.io/1197101').install()"
        }
      ]}
    />

    <Bio />

    <section>
      {sortBy(route.pages, page => get(page, 'data.date'))
        .reverse()
        .map(page => {
          if (
            get(page, 'file.ext') === 'md' &&
            !includes(page.path, '/404') &&
            !get(page, 'data.draft')
          ) {
            const title = get(page, 'data.title') || page.path;
            const posted = get(page, 'data.date');

            return (
              <Post
                key={page.path}
                path={page.path}
                title={title}
                posted={posted}
              />
            );
          }
        })}
    </section>
  </div>
);

BlogIndex.propTypes = {
  route: PropTypes.object
};

export default BlogIndex;
