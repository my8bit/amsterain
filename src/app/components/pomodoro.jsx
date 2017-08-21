import React, {Component} from 'react';
import {connect} from 'react-redux';
import c3 from 'c3';
import {createDateFromTime} from '../libs/tick.js';
import _ from 'lodash';
import C3Chart from 'react-c3js';
import {loadWeerAction} from '../libs/firebase.auth';
const chartId = 'chart';
let chart;

class TimerWidget extends Component {
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
      legend: {show: false},
      tooltip: {
        contents: d => {
          const min = d[0].x.getMinutes() < 10 ? `0${d[0].x.getMinutes()}` : d[0].x.getMinutes();
          const time = `${d[0].x.getHours()}:${min}`;
          const value = d[0].value;
          dispatch({
            type: 'CHANGE_TIP',
            value,
            time
          });
        },
        show: true,
        position: () => {
          let event = window.d3.event;
          if (event.type === 'touchmove') {
            event = event.changedTouches[0];
          }
          return {
            top: event.clientY,
            left: event.clientX
          };
        }
      },
      point: {show: false},
      color: {pattern: ['lightskyblue']},
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
      interaction: {enabled: true},
      padding: {right: 30, left: 30},
      axis: {
        y: {max: 300, show: false},
        x: {
          label: 'Time',
          type: 'timeseries',
          tick: {
            count: () => Math.round(chart.element.offsetWidth / 75),
            format: '%H:%M'
          }
        }
      }
    });
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps, nextState', nextProps, nextState);
  }
  render() {
    console.log('render');
    const {data, dispatch} = this.props;
    console.log('data', data);
    const d = {
      columns: [
        ['data4', 30, 200, 100, 400, 150, 250],
        ['data5', 50, 20, 10, 40, 15, 25]
      ],
      names: {
        data4: 'Name 4',
        data5: 'Name 5'
      }
    };
    renderChart(data, dispatch);
    return (
      <div className="container">
        <C3Chart data={d}/>
        <div id={chartId}></div>
      </div>
   );
  }
}

function touch(chart, dispatch) {
  const $$ = chart.internal;
  const element = document.querySelector(`#${chartId}`);
  const $el = window.d3.select(element);
  const $rect = $el.select('.c3-event-rects');
  const $focusLine = $el.select('.c3-xgrid-focus > line');
  let fn;
  $rect.on('touchmove', () => {
    const touch = window.d3.event.changedTouches[0];
    const $rect = document.elementFromPoint(touch.clientX, touch.clientY);
    let className;
    if ($rect) {
      className = $rect.getAttribute('class');
      const index = className && dispatch && ~~className.match(/\d+$/);
      const selectedData = $$.filterTargetsToShow($$.data.targets).map(t => {
        return $$.addName($$.getValueOnIndex(t.values, index));
      });
      showFocusLine($rect);
      const min = selectedData[0].x.getMinutes() < 10 ? `0${selectedData[0].x.getMinutes()}` : selectedData[0].x.getMinutes();
      const time = `${selectedData[0].x.getHours()}:${min}`;
      const value = selectedData[0].value;
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
    }
  });
  function showFocusLine($rect) {
    const x = Math.floor(~~$rect.getAttribute('x') + ~~$rect.getAttribute('width') / 2);
    $focusLine.attr({x1: x, x2: x}).style('visibility', 'visible');
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
    console.log('chart load');
    chart.load({
      columns: [preceptoin, time]
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
