import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Timer} from '../components/pomodoro.jsx';

export class HomeCmp extends Component {
  render() {
    return (
      <section id="home" className="site-wrap">
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${encodeURI(window.location.pathname)}`}]}
          title="Amsterdam Rain"
        />
        <div className="menu-background transparent"><h1>Amsterdam Rain</h1></div>
        <Timer/>
      </section>
    );
  }
}
