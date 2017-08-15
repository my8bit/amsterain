import React, {Component} from 'react';
import Ink from 'react-ink';
import {Link} from 'react-router';
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
        <li className="nav-item"><Link to="/">Perception<i className="fa fa-tint right" aria-hidden="true"></i><Ink/></Link></li>
        <li className="nav-item"><Link to="/settings">Information<i className="fa fa-info right" aria-hidden="true"></i><Ink/></Link></li>
      </ul>
    );
  }
}

SidebarList.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return store;
};

export const SidebarCmp = connect(mapStateToProps)(SidebarList);
