import React, {Component} from 'react';
import {connect} from 'react-redux';
import c3 from 'c3';
import {createDateFromTime} from '../libs/tick.js';
import _ from 'lodash';
// import moment from 'moment';
// import {notifyMe} from '../workers/notification';
// import {timerOptions} from '../../config';
// import {getRainingTicks, formatDate, addToInterval, removeFromInterval} from '../libs/timer';
// import Ink from 'react-ink';

import {loadWeerAction} from '../libs/firebase.auth';

// const {buttonStatus} = timerOptions;
// const {START, STOP} = buttonStatus;
const chartId = 'chart';
let chart;

class TimerWidget extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    chart = c3.generate({
      bindto: `#${chartId}`,
      data: {
        x: 'x',
        type: 'area-spline',
        xFormat: '%H:%M',
        columns: [[], []]
      },
      legend: {
        show: false
      },
      tooltip: {
        contents: d => {
          // console.log('d', d[0].x, d[0].value);
          const min = d[0].x.getMinutes() < 10 ? `0${d[0].x.getMinutes()}` : d[0].x.getMinutes();
          const time = `${d[0].x.getHours()}:${min}`;
          const value = d[0].value;

          dispatch({
            type: 'CHANGE_TIP',
            value,
            time
          });
        },
        /*
        format: {
          name: (name, ratio, id, index) => {
            console.log(name, ratio, id, index);
            return name;
          }
        },
        value: (value, ratio, id, index) => {
          console.log(value, ratio, id, index);
          console.log('value', value);
          return ratio;
        } */
        show: true,
        position: () => {
          let event = window.d3.event;

          if (event.type === 'touchmove') {
            event = event.changedTouches[0];
          }

          // x and y coordination are taken from touch event
          return {
            top: event.clientY,
            left: event.clientX
          };
        }
      },
      point: {
        show: false
      },
      color: {
        pattern: ['lightskyblue']
      },
      grid: {
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
      },
      interaction: {
        enabled: true
      },
      padding: {
        right: 30,
        // bottom: 100,
        left: 30
      },
      axis: {
        y: {
          // label: 'y label'
          max: 300,
          show: false
        },
        x: {
          label: 'Time',
          type: 'timeseries',
          tick: {
            // fit: false,
            // count: 5,
            count: () => Math.round(chart.element.offsetWidth / 75),
            format: '%H:%M'
          }
        }
      }
    });
    // touch(chart, dispatch);
  }

  componentWillUnmount() {
  }
  onTouchMove() {
    console.log('react move');
  }
  handleClick() {
  }

  componentWillUpdate() {

  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }

  render() {
    console.log('render');
    const {data, dispatch} = this.props;
    renderChart(data, dispatch);
    return (
      <div className="container">
        <div id={chartId}></div>
      </div>
   );
  }
}

function touch(chart, dispatch) {
        // chart instance
  const $$ = chart.internal;
  const element = document.querySelector(`#${chartId}`);
  // select elements
  const $el = window.d3.select(element);  // base element
  const $rect = $el.select('.c3-event-rects');  // rects
  const $focusLine = $el.select('.c3-xgrid-focus > line');  // focus line

  // bind touchmove event
  let fn;
  $rect.on('touchmove', () => {
    const touch = window.d3.event.changedTouches[0];
    const $rect = document.elementFromPoint(touch.clientX, touch.clientY);
    let className;
    // console.log(touch, $rect);
    if ($rect) {
      className = $rect.getAttribute('class');
      const index = className && dispatch && ~~className.match(/\d+$/);

      // get the data according index
      const selectedData = $$.filterTargetsToShow($$.data.targets).map(t => {
        return $$.addName($$.getValueOnIndex(t.values, index));
      });
      // console.log('index, selectedData, className', selectedData);
      showFocusLine($rect);
      const min = selectedData[0].x.getMinutes() < 10 ? `0${selectedData[0].x.getMinutes()}` : selectedData[0].x.getMinutes();
      const time = `${selectedData[0].x.getHours()}:${min}`;
      const value = selectedData[0].value;
      // console.log(time, value);

      if (fn) {
        fn();
      } else {
        fn = _.debounce(() => { // eslint-disable-line
          console.log(time, value);
          dispatch({
            type: 'CHANGE_TIP',
            value,
            time
          });
          fn = undefined;
        }, 100, {maxWait: 100});
      }

      // dispatch({
      //   type: 'CHANGE_TIP',
      //   value,
      //   time
      // });
      // $$.showTooltip(selectedData, $rect);
    }
  });

  // show focus line
  function showFocusLine($rect) {
    const x = Math.floor(~~$rect.getAttribute('x') + ~~$rect.getAttribute('width') / 2);

    $focusLine.attr({
      x1: x,
      x2: x
    }).style('visibility', 'visible');
  }
}

function renderChart(data, dispatch) {
  const time = data.map((item, idx, arr) => {
    const time = createDateFromTime(item.time);
    if (idx < arr.length - 1) {
      if (parseInt(item.time.split(':')[0], 10) - parseInt(arr[idx + 1].time.split(':')[0], 10) === 23) {
        time.setDate(time.getDate() - 1);
      }
    }
    return time;
  });
  const preceptoin = data.map(item => item.preceptoin);

  time.unshift('x');
  preceptoin.unshift('time');
  if (chart) {
    touch(chart, dispatch);
    // chart.internal.config.axis_x_tick_values = getRainingTicks(data); // eslint-disable-line
    chart.load({
      columns: [
        preceptoin,
        time
      ]
    });
  }
}

TimerWidget.propTypes = {
  data: React.PropTypes.array,
  value: React.PropTypes.number.isRequired,
  time: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {data} = store.loadReducer;
  return {data, value, time};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
