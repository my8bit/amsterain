import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {loadWeerAction} from '../libs/firebase.auth';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryCursorContainer} from 'victory';
class TimerWidget extends Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.time1, this.props.time1);
  }
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }
  render() {
    const {victoryChartData, dispatch} = this.props;
    return (
      <div
        className="container"
        >
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{x: 'time'}}
          tickFormat={time => {
            console.log(time); // eslint-disable-line no-console
            return time;
          }}
          style={{
            data: {
              fill: 'red',
              stroke: 'lightskyblue'
            }
          }}
          containerComponent={
            <VictoryCursorContainer
              cursorDimension="x"
              onCursorChange={value => {
                const min = value.getMinutes() < 10 ? `0${value.getMinutes()}` : value.getMinutes();
                const time = `${value.getHours()}:${min}`;
                // const value = value.value;
                dispatch({
                  type: 'CHANGE_TIP',
                  value: 0,
                  time
                });
                console.log(value); // eslint-disable-line no-console
              }}
              style={{
                data: {
                  fill: 'red',
                  stroke: 'lightskyblue'
                }
              }}
            />
          }
          >
          <VictoryLine
            theme={VictoryTheme.material}
            style={{
              data: {
                stroke: 'lightskyblue'
              }
            }}
            interpolation ="bundle"
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

TimerWidget.propTypes = {
  data: PropTypes.array,
  time1: PropTypes.array,
  preceptoin1: PropTypes.array,
  value: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  victoryChartData: PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {data, time1, preceptoin1, victoryChartData} = store.loadReducer;
  return {data, value, time, time1, preceptoin1, victoryChartData};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
