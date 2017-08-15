import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';

export class Home extends Component {
  render() {
    const {color} = this.props;
    return (
      <section id="home" className="timer site-wrap" style={{backgroundColor: color}}>
        <div className="menu-background transparent">Perception in ✖✖✖</div>
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
Home.propTypes = {color: React.PropTypes.string.isRequired};

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  return {color};
};

export const HomeCmp = connect(mapStateToProps)(Home);
