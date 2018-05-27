import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadWeerAction} from '../libs/firebase.auth';
import {VictoryLabel, VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from 'victory';

// TODO: add theme

class TimerWidget extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }
  render() {
    const {victoryChartData} = this.props;
    return (
      <div
        className="container"
        >
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{y: [0, 60]}}
          scale={{x: 'time', y: 'linear'}}
          >
          <VictoryLabel
            text={"Heavy"}
            x={266}
            y={82}
            style={{
              fill: 'white' // TODO theme
            }}
          />
          <VictoryLabel
            text={"Moderate"}
            x={245}
            y={248}
            style={{
              fill: 'white' // TODO theme
            }}
          />
          <VictoryLabel
            text={"Slight"}
            x={270}
            y={282}
            style={{
              fill: 'white' // TODO theme
            }}
          />
          <VictoryAxis dependentAxis
            tickValues={[2, 10, 50]}
            style={{
              axis: {
                fill: 'transparent', // TODO theme
                stroke: 'transparent' // TODO theme
              },
              label: {
                fill: 'white' // TODO theme
              },
              ticks: {
                strokeWidth: 0
              },
              tickLabels: {
                fill: 'transparent' // TODO theme
              },
              grid: {
                fill: 'white',
                strokeWidth: 2
              }
            }}
          />
          <VictoryAxis
            tickFormat={time => time.toLocaleTimeString([], {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            })}
            style={{
              tickLabels: {
                fill: 'white' // TODO theme
              },
              grid: {
                strokeWidth: 0
              }
            }}
            />
          <VictoryArea
            theme={VictoryTheme.material}
            style={{
              data: {
                fill: 'lightskyblue'
              }
            }}
            interpolation="monotoneX"
            animate={true}
            data={victoryChartData}
            x="time"
            y="precep"
            />
          </VictoryChart>
      </div>
   );
  }
}

/*
TODO Component for VictoryChart

containerComponent={
  <VictoryCursorContainer
    cursorLabel={data => {
      return data.x.toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }}
    onCursorChange={value => {
       // console.log(value); // eslint-disable-line no-console
      return value;
      // const min = value.getMinutes() < 10 ? `0${value.getMinutes()}` : value.getMinutes();
      // const time = `${value.getHours()}:${min}`;
      // dispatch({
      //   type: 'CHANGE_TIP',
      //   value: 0,
      //   time
      // });
    }}
    cursorDimension="x"
    style={{
      tickLabels: {
        fill: 'white' // TODO theme
      },
      data: {
        strokeWidth: 2,
        stroke: 'white',
        fill: 'white'
      }
    }}
  />
}
 */

TimerWidget.propTypes = {
  value: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  victoryChartData: PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {victoryChartData} = store.loadReducer;
  return {value, time, victoryChartData};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
