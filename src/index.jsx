import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatDate, addToInterval, removeFromInterval} from './app/libs/timer';
import './index.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    addToInterval(this.update);
  }

  componentWillUnmount() {
    removeFromInterval(this.update);
  }

  render() {
    const {color, time, startTime, children} = this.props;
    const currentTime = formatDate(time, startTime);
    return (
      <main>
        <Helmet
          title={startTime ? currentTime : textContent}
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
            {name: 'msapplication-TileColor', content: color},
            {name: 'theme-color', content: color},
            {name: 'msapplication-navbutton-color', content: color},
            {name: 'apple-mobile-web-app-status-bar-style', content: color}
          ]}
          />
        <SidebarCmp/>
        <input accessKey="t" type="checkbox" id="nav-trigger" className="nav-trigger"/>
        <label htmlFor="nav-trigger">
          <div id="close-icon"><span></span><span></span><span></span></div>
        </label>
        {children}
      </main>
    );
  }
}

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  return {color};
};

Main.propTypes = {
  startTime: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired
};

const App = connect(mapStateToProps)(Main);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <section>
        <Route path="/" component={App}>
          <IndexRoute component={HomeCmp}/>
          <Route path="/settings" component={AboutCmp}/>
        </Route>
      </section>
    </Router>
  </Provider>,
  document.getElementById('app')
);
