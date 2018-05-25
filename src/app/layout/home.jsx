import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';

export class HomeCmp extends Component {
  render() {
    return (
      <section id="home" className="site-wrap">
        <div className="menu-background transparent">Precipitation</div>
        <Timer/>
      </section>
    );
  }
}
