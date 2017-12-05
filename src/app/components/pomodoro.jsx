import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import BillboardChart from 'react-billboard.js';
import {loadWeerAction} from '../libs/firebase.auth';
class TimerWidget extends Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.time1, this.props.time1);
  }
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }
  render() {
    const {preceptoin1, time1, dispatch} = this.props;
    const ch = ch => {
      this.chartWidth = ch && ch.chart.element;
    };
    return (
      <div
        className="container"
        >
        <BillboardChart
          className="chart"
          id="chart"
          ref={ch}
          data={{
            x: 'x',
            type: 'area-spline',
            xFormat: '%H:%M',
            columns: [
              time1,
              preceptoin1
            ]
          }}
          legend={{show: false}}
          padding={{right: 30, left: 30}}
          point={{show: false}}
          color={{pattern: ['lightskyblue']}}
          tooltip={{
            contents: d => {
              const min = d[0].x.getMinutes() < 10 ? `0${d[0].x.getMinutes()}` : d[0].x.getMinutes();
              const time = `${d[0].x.getHours()}:${min}`;
              const value = d[0].value;
              dispatch({
                type: 'CHANGE_TIP',
                value,
                time
              });
            }
          }}
          grid={{
            y: {
              lines: [
                {value: 100, text: 'Light'},
                {value: 255, text: 'Heavy', class: 'heavy'}
              ]
            },
            x: {
              show: true,
              lines: [
                {value: (new Date()), text: 'Now', position: 'start'}
              ]
            }
          }}
          axis={{
            y: {max: 300, show: false},
            x: {
              label: 'Time',
              type: 'timeseries',
              tick: {
                count: () => {
                  // TODO
                  const width = this.chartWidth && this.chartWidth.offsetWidth || 0;
                  return Math.round(width / 75);
                },
                format: '%H:%M'
              }
            }
          }}
          />
      </div>
   );
  }
}

TimerWidget.propTypes = {
  data: PropTypes.array,
  time1: PropTypes.array,
  preceptoin1: PropTypes.array,
  value: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {data, time1, preceptoin1} = store.loadReducer;
  return {data, value, time, time1, preceptoin1};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
