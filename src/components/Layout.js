import { StaticQuery, graphql } from 'gatsby';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from '@sentry/browser';

import Header from '../components/Header';
import Footer from '../components/Footer';

import 'prism-themes/themes/prism-material-dark.css';
import '../styles/global.module.scss';
import layoutStyles from '../styles/layout.module.scss';

const environment = process.env.NODE_ENV;
const version = process.env.GATSBY_RELEASE_VERSION;

if (environment === 'production') {
  try {
    LogRocket.init('u8t5r0/damianmullinscom');

    setupLogRocketReact(LogRocket);

    Sentry.init({
      dsn: 'https://b7ebba6ca5dd4d65a2ee0ea7f7665a22@sentry.io/1197101',
      environment,
      release: `damianmullins@${version}`
    });

    Sentry.configureScope(scope => {
      scope.addEventProcessor(async event => {
        event.extra.sessionURL = LogRocket.sessionURL;
        return event;
      });
    });
  } catch (e) { }
}

export default ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}

    render={({
      site: {
        siteMetadata: {
          title,
          author,
          authorBio,
          authorEmail,
          githubUsername,
          twitterUsername,
          linkedInUsername
        }
      }
    }) => (
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

          <div className={layoutStyles.l_container}>
            {children}
          </div>

          <Footer
            author={author}
            authorEmail={authorEmail}
            githubUsername={githubUsername}
            twitterUsername={twitterUsername}
            linkedInUsername={linkedInUsername}
          />
        </Fragment>
      )}
  />
);
