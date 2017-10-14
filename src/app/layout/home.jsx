import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Timer} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';

export class Home extends Component {
  render() {
    const {color, value, time} = this.props;
    return (
      <section id="home" className="timer site-wrap" style={{backgroundColor: color}}>
        <div className="menu-background transparent"><span>{time}</span><span className="value"> {value} </span>A&apos;dam Neerslag</div>
        <Timer/>
      </section>
    );
  }
}
/*
<h1 className="menu-background">
  Amsterdam neerslag komende 2 uur
</h1>
 */

//  <small>source: <a href="https://www.buienradar.nl/overbuienradar/gratis-weerdata">www.buienradar.nl</a></small>
Home.propTypes = {
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {color} = store.representationReducer;
  return {color, value, time};
};

export const HomeCmp = connect(mapStateToProps)(Home);
