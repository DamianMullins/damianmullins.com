import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from '../styles/nav.module.scss';

class Nav extends Component {
  navToggleRef = React.createRef();

  handleClick = e => {
    if (e.target instanceof HTMLAnchorElement) {
      this.navToggleRef.current.checked = false;
    }
  };

  render() {
    return (
      <nav className={styles.wrapper} role="navigation">
        <input
          className={styles.input}
          type="checkbox"
          ref={this.navToggleRef}
        />

        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />

        <ul className={styles.menu} onClick={this.handleClick}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dev-diary/">Dev diary</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
