/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

import {Navbar, Nav, NavItem, NavDropDown,MenuItem} from 'react-bootstrap';

@withStyles(s)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a className={s.link} href="/" onClick={Link.handleClick}>AnkiHub</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>{this.props.children}</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem><a className={s.link} href="/profile" onClick={Link.handleClick}>profile</a></NavItem>
            <NavItem><a className={s.link} href="/home" onClick={Link.handleClick}>home</a></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Navigation;
