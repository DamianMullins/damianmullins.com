import React from 'react';
import PropTypes from 'prop-types';
import { prefixLink } from 'gatsby-helpers';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Template = ({ location, children }) => (
  <div>
    <Header modifier={location.pathname === prefixLink('/') ? '' : 'small'} />

    {children}

    <Footer />
  </div>
);

Template.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  route: PropTypes.object
};

export default Template;
