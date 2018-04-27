import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers';

const BUILD_TIME = new Date().getTime();

const Html = ({ body }) => {
  const head = Helmet.rewind();

  let css;
  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!./public/styles.css')
        }}
      />
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

        {head.title.toComponent()}
        {head.meta.toComponent()}

        {css}
        <script
          src="https://cdn.ravenjs.com/3.24.2/raven.min.js"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <div id="react-mount" dangerouslySetInnerHTML={{ __html: body }} />
        <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
      </body>
    </html>
  );
};

Html.displayName = 'HTML';

Html.propTypes = {
  body: PropTypes.string
};

export default Html;
