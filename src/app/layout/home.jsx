import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';

export class HomeCmp extends Component {
  render() {
    return (
      <section id="home" className="site-wrap">
        <div className="menu-background transparent"><h1>Precipitation</h1></div>
        <Timer/>
      </section>
    );
  }
}
