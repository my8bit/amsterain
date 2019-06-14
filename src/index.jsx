import * as Sentry from '@sentry/browser';
Sentry.init({dsn: 'https://e64c7d8d3ede4d2ea33489852d43db2f@sentry.io/1480411'});

import 'babel-polyfill';
import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './app/workers/notification';

import {Provider} from 'react-redux';
import Helmet from 'react-helmet';
// Use HashRouter for Electron
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {NotFound} from './app/layout/not-found.jsx';
import {textContent} from './config';
import {store} from './app/store';
import './index.scss';

class Main extends Component {
  componentDidMount() {
    throw new Error('Sentry');
  }
  render() {
    return (
      <main>
        <Helmet
          meta={[
            {name: 'application-name', content: textContent}
          ]}
          />
        <Router>
          <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger"/>
            <label htmlFor="nav-trigger">
              <div id="close-icon"><span></span><span></span><span></span></div>
            </label>
            <Route path="/" component={SidebarCmp}/>
            <Switch>
              <Route exact path="/" component={HomeCmp}/>
              <Route exact path="/about" component={AboutCmp}/>
              <Route component={NotFound}/>
            </Switch>
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
