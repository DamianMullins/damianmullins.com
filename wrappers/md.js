import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import ReadNext from '../components/ReadNext';
import Bio from 'components/Bio';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

import layout from 'css/layout.module.scss';

class MarkdownWrapper extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div className={`markdown ${layout.l_container}`}>
        <Helmet
          title={`${post.title} - ${config.blogTitle}`}
          meta={[
            {
              name: 'description',
              content: post.description || config.authorBio
            }
          ]}
          script={[
            {
              innerHTML:
                "Raven.config('https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@sentry.io/1197101').install()"
            }
          ]}
        />

        <h1>{post.title}</h1>

        <p>
          <em>{moment(post.date).format('Do MMMM YYYY')}</em>
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.body }} />

        <ReadNext post={post} pages={route.pages} />
      </div>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object
};

export default MarkdownWrapper;
