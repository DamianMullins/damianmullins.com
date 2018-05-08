import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import kebab from 'slugify';

import layout from '../styles/layout.module.scss';
import notFoundImage from '../assets/images/404.jpg';

const PageNotFound = () => (
  <div className={layout.l_container}>
    <Helmet title="Page Not Found" />
    <h1>Page Not Found</h1>

    <p>The page you are looking for couldn't be found.</p>
    <img src={notFoundImage} alt="" />
  </div>
);

export default PageNotFound;
