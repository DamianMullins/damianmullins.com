import React from 'react';
import { prefixLink } from 'gatsby-helpers';
import Header from 'components/Header';
import Footer from 'components/Footer';

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    const headerModifier = location.pathname === prefixLink('/') ? '' : 'small';

    return (
      <div>
        <Header modifier={headerModifier} />

        {children}

        <Footer />
      </div>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Template;
