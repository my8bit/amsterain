import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadWeerAction} from '../libs/firebase.auth';
import {VictoryTooltip, Flyout, VictoryVoronoiContainer, Line, VictoryCursorContainer, VictoryLabel, VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from 'victory';
console.log(Line, Flyout, VictoryTooltip, VictoryCursorContainer, VictoryVoronoiContainer);  // eslint-disable-line no-console
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
          scale={{x: 'time'}}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={d => {
                const time = d.time.toLocaleTimeString([], {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                });
                const precep = Math.round(d.precep); // TODO
                const rain = precep ? `☔ ${precep}mm/h ${time}` : '';
                return rain;// `${rain}\n${time}`;
                // return console.log(d) || // eslint-disable-line no-console
                // `${Math.round(d.precep)}`;
              }}
              labelComponent={<VictoryTooltip
                labelComponent={<VictoryLabel
                  y={25}
                  style={{
                    fill: 'white',
                    fontSize: 14,
                    fontFamily: '"Helvetica Neue", "Roboto", sans-serif'
                  }}
                />}
                flyoutComponent={<Flyout
                  y={300}
                  height="1"
                  cornerRadius="0"
                  width="1"
                  pointerLength="255"
                  pointerWidth="1"
                />}
                flyoutStyle={{fill: 'red', stroke: 'red'}}
              />}
            />
          }
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
                // strokeWidth: 0
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
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={d => {
                return console.log(d) || // eslint-disable-line no-console
                `${Math.round(d.precep)}`;
              }}
              labelComponent={
                <VictoryTooltip
                  labelComponent={<VictoryLabel dy={20}/>}
                  flyoutComponent={<Flyout/>}
                  flyoutStyle={{fill: 'white', stroke: 'white'}}
                />
              }
            />

            <VictoryVoronoiContainer
              labelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white' // TODO theme
                  }}
                />
              }
              voronoiDimension="y"
              labels={d => `${d.precep} lll}`}
           />

            <VictoryCursorContainer
              cursorLabel={data => {
                return `${data.x.toLocaleTimeString([], {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                })}\n0.3mm/h`;
              }}
              onCursorChange={() => {
                // console.log(value); // eslint-disable-line no-console
                // return `${value}\n0.3mm/h`;
                // const min = value.getMinutes() < 10 ? `0${value.getMinutes()}` : value.getMinutes();
                // const time = `${value.getHours()}:${min}`;
                // dispatch({
                //   type: 'CHANGE_TIP',
                //   value: 0,
                //   time
                // });
              }}
              cursorLabelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white' // TODO theme
                  }}
                />
              }
              cursorComponent={
                <Line
                  style={{
                    stroke: 'white',
                    strokeWidth: 2,
                    tickLabels: {
                      stroke: 'white',
                      fill: 'white' // TODO theme
                    }
                  }}
                />
              }
              cursorDimension="x"
              style={{
                label: {
                  stroke: 'white',
                  fill: 'white' // TODO theme
                },
                data: {
                  strokeWidth: 1,
                  stroke: 'white',
                  fill: 'white'
                }
              }}
            />
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
