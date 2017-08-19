import React, {Component} from 'react';
import {connect} from 'react-redux';
import c3 from 'c3';
import {getRainingTicks, createDateFromTime} from '../libs/tick.js';
// import moment from 'moment';
// import {notifyMe} from '../workers/notification';
// import {timerOptions} from '../../config';
// import {getRainingTicks, formatDate, addToInterval, removeFromInterval} from '../libs/timer';
// import Ink from 'react-ink';

import Swipe from 'react-easy-swipe';
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
    this.handleOnSwipeUp = this.handleOnSwipeUp.bind(this);
    this.handleOnSwipeDown = this.handleOnSwipeUp.bind(this);
  }

  componentDidMount() {
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
            {value: 255, text: 'Heavy'}
          ]
        },
        x: {
          lines: [
            {value: (new Date()), text: 'Now'}
          ]
        }
      },
      interaction: {
        enabled: true
      },
      padding: {
        right: 30,
        bottom: 100,
        left: 30
      },
      axis: {
        y: {
          // label: 'y label'
          max: 255,
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
  }

  componentWillUnmount() {
  }

  handleClick() {
  }

  componentWillUpdate() {

  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }

  handleOnSwipeUp() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }

  handleOnSwipeDown() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }

  render() {
    const {data} = this.props;
    renderChart(data);
    return (
      <Swipe
        onSwipeUp={this.handleOnSwipeUp}
        onSwipeDown={this.handleOnSwipeDown}
        >
        <div className="container">
          <div id={chartId}></div>
        </div>
      </Swipe>
    );
  }
}

function touch(chart) {
        // chart instance
  const $$ = chart.internal;
  const element = document.querySelector(`#${chartId}`);
  // select elements
  const $el = window.d3.select(element);  // base element
  const $rect = $el.select('.c3-event-rects');  // rects
  const $focusLine = $el.select('.c3-xgrid-focus > line');  // focus line
  const point = {
    $current: null,
    $list: $el.selectAll('.c3-circles circle')  // point
  };

  // bind touchmove event
  $rect.on('touchmove', touchHandler);

  // touch event handler
  function touchHandler() {
    const touch = window.d3.event.changedTouches[0];
    const $rect = document.elementFromPoint(touch.clientX, touch.clientY);
    let className;

    if ($rect && (className = $rect.getAttribute('class'))) {
        // get the current rect area index
      const index = ~~className.match(/\d+$/);

      // get the data according index
      const selectedData = $$.filterTargetsToShow($$.data.targets).map(t => {
        return $$.addName($$.getValueOnIndex(t.values, index));
      });

      $$.showTooltip(selectedData, $rect);

      showFocusLine($rect);
      setExpandPointStyle(index);
    }
  }

  // show focus line
  function showFocusLine($rect) {
    const x = Math.floor(~~$rect.getAttribute('x') + ~~$rect.getAttribute('width') / 2);

    $focusLine.attr({
      x1: x,
      x2: x
    }); // .style('visibility', 'visible');
  }

  // expand selected point
  function setExpandPointStyle(index) {
    const r = $$.config.point_r;
    const expandR = $$.config.point_focus_expand_r || r * 1.75;

    if (point.$current) {
      point.$current.attr('r', r);
    }

    if (!isNaN(index)) {
      point.$current = window.d3.select(point.$list[0][index]);
      point.$current.attr('r', expandR);
    }
  }
}

function renderChart(data) {
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

  /*
  const ticks = data
    .filter((el, idx, arr) => {
      const prev = parseInt(arr[idx - 1] && arr[idx - 1].preceptoin, 10);
      const next = parseInt(arr[idx + 1] && arr[idx + 1].preceptoin, 10);
      return !((prev !== 0 && next !== 0) && (parseInt(el.preceptoin, 10) !== 0));
    })
    .filter(el => el.preceptoin !== '0')
    .map(el => createDateFromTime(el.time));
  */

  time.unshift('x');
  preceptoin.unshift('time');
  if (chart) {
    console.log(getRainingTicks(data));
    // chart.internal.config.axis_x_tick_values = getRainingTicks(data); // eslint-disable-line
    touch(chart);
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
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {data} = store.loadReducer;
  return {data};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
