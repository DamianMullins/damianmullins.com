import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';

import 'prismjs/themes/prism-funky.css';
import '../styles/global.module.scss';

export default ({ children, data }) => {
  const {
    title,
    author,
    authorBio,
    authorEmail,
    githubUsername,
    twitterUsername,
    linkedInUsername
  } = data.site.siteMetadata;
  return (
    <Fragment>
      <Helmet
        key="app-head"
        titleTemplate={`%s — ${title}`}
        defaultTitle={title}
      >
        <html lang="en" />
        <meta name="description" content={authorBio} />
      </Helmet>

      <Header />

      {children()}

      <Footer
        author={author}
        authorEmail={authorEmail}
        githubUsername={githubUsername}
        twitterUsername={twitterUsername}
        linkedInUsername={linkedInUsername}
      />
    </Fragment>
  );
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        author
        authorEmail
        authorBio
        githubUsername
        twitterUsername
        linkedInUsername
      }
    }
  }
`;
