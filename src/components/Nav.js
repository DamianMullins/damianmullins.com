import React, { Component } from 'react';
import { Link } from 'gatsby';

import { wrapper, input, line, menu } from '../styles/nav.module.scss';

class Nav extends Component {
  navToggleRef = React.createRef();

  handleClick = e => {
    if (e.target instanceof HTMLAnchorElement) {
      this.navToggleRef.current.checked = false;
    }
  };

  render() {
    return (
      <nav className={wrapper} role="navigation">
        <input
          className={input}
          type="checkbox"
          ref={this.navToggleRef}
        />

        <span className={line} />
        <span className={line} />
        <span className={line} />

        <ul className={menu} onClick={this.handleClick}>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
