import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {URL} from '../libs/common.js';

export class AboutCmp extends Component {
  render() {
    return (
      <section id="about" className="about site-wrap">
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${encodeURI(window.location.pathname)}`}]}
          title="About"
        />
        <div className="menu-background dark"><h1>About</h1></div>
        <div className="container description">
          <div><h2>Amsterdam neerslag</h2></div>
          <img src="static/favicon-96x96.png"/>
          <div className="">Icons was processed at <a href="http://www.favicomatic.com/">favicomatic</a></div>
          <div className="">Weather data from <a href="https://www.buienradar.nl/overbuienradar/gratis-weerdata">buineradar</a></div>
          <div className="">Crafted with <span className="heart">❤︎</span> in ✖✖✖</div>
        </div>
      </section>
    );
  }
}
