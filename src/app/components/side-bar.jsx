import React, {Component} from 'react';
import Ink from 'react-ink';
import {NavLink} from 'react-router-dom';

export class SidebarCmp extends Component {
  render() {
    return (
      <ul className="navigation">
        <li className="nav-item"><NavLink to="/">Precipitation<i className="fa fa-tint right" aria-hidden="true"></i><Ink/></NavLink></li>
        <li className="nav-item"><NavLink to="/about">About<i className="fa fa-info right" aria-hidden="true"></i><Ink/></NavLink></li>
      </ul>
    );
  }
}
