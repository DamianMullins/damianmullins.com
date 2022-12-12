import { useStaticQuery, graphql } from 'gatsby';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';

import 'prism-themes/themes/prism-material-dark.css';
import '../styles/global.module.scss';
import { l_container } from '../styles/layout.module.scss';

const version = process.env.GATSBY_RELEASE_VERSION;

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: {
        title,
        author,
        authorBio,
        authorEmail,
        githubUsername,
        twitterUsername,
        linkedInUsername,
      },
    },
  } = useStaticQuery(graphql`
    {
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
  `);

  return (
    <Fragment>
      <Helmet
        key="app-head"
        titleTemplate={`%s — ${title}`}
        defaultTitle={title}
      >
        <html lang="en" />
        <meta name="description" content={authorBio} />
        <meta name="release" content={version} />
      </Helmet>

      <Header />

      <main className={l_container}>{children}</main>

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

export default Layout;
