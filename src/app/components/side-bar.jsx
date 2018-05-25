import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {checkAuth, logoutAction, loginAction} from '../libs/firebase.auth';

class SidebarList extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(checkAuth());
  }

  handleLogin() {
    const {dispatch} = this.props;
    dispatch(loginAction());
  }

  handleLogout() {
    const {dispatch} = this.props;
    dispatch(logoutAction());
  }

  render() {
    return (
      <ul className="navigation">
        <li className="nav-item"><NavLink to="/">Precipitation<i className="fa fa-tint right" aria-hidden="true"></i><Ink/></NavLink></li>
        <li className="nav-item"><NavLink to="/about">About<i className="fa fa-info right" aria-hidden="true"></i><Ink/></NavLink></li>
      </ul>
    );
  }
}

SidebarList.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return store;
};

export const SidebarCmp = connect(mapStateToProps)(SidebarList);
