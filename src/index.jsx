import 'babel-polyfill';
import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import {Provider} from 'react-redux';
import Helmet from 'react-helmet';
// Use HashRouter for Electron
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {textContent} from './config';
import {store} from './app/store';
import './index.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.update = this.forceUpdate.bind(this);
  }

  render() {
    return (
      <main>
        <Helmet
          link={[
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-57x57.png', sizes: '57x57'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-114x114.png', sizes: '114x114'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-72x72.png', sizes: '72x72'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-60x60.png', sizes: '60x60'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-120x120.png', sizes: '120x120'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-76x76.png', sizes: '76x76'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-96x96.png', sizes: '96x96'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-32x32.png', sizes: '32x32'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-16x16.png', sizes: '16x16'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-128.png', sizes: '128x128'}
          ]}
          meta={[
            {name: 'description', content: 'Amsterdam neerslag komende 2 uur'},
            {name: 'application-name', content: textContent},
            {name: 'apple-mobile-web-app-capable', content: 'yes'},
            {name: 'mobile-web-app-capable', content: 'yes'},
            {name: 'msapplication-square70x70logo', content: 'static/mstile-70x70.png'},
            {name: 'msapplication-TileColor', content: '#333133'},
            {name: 'theme-color', content: '#333133'},
            {name: 'msapplication-navbutton-color', content: '#333133'},
            {name: 'apple-mobile-web-app-status-bar-style', content: '#333133'}
          ]}
          />
        <Router>
          <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger"/>
            <label htmlFor="nav-trigger">
              <div id="close-icon"><span></span><span></span><span></span></div>
            </label>
            <Route path="/" component={SidebarCmp}/>
            <Route exact path="/" component={HomeCmp}/>
            <Route exact path="/about" component={AboutCmp}/>
          </div>
        </Router>
      </main>
    );
  }
}

// const mapStateToProps = store => {
//   const {color} = store.representationReducer;
//   return {color};
// };

// Main.propTypes = {
//   dispatch: PropTypes.func.isRequired
// };

// const App = connect(mapStateToProps)(Main);

ReactDOM.render(
  <Provider store={store}>
    <section>
      <Main/>
    </section>
  </Provider>,
  document.getElementById('app')
);
