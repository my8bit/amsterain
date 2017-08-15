import React, {Component} from 'react';
import {connect} from 'react-redux';
import c3 from 'c3';
// import moment from 'moment';
//

// import {notifyMe} from '../workers/notification';
// import {timerOptions} from '../../config';
// import {getTimer, formatDate, addToInterval, removeFromInterval} from '../libs/timer';
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
        show: true
      },
      point: {
        show: false
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
        enabled: false
      },
      padding: {
        right: 20,
        bottom: 100,
        left: 20
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
            fit: true,
            count: 4,
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
  time.unshift('x');
  preceptoin.unshift('time');
  if (chart) {
    chart.load({
      columns: [
        preceptoin,
        time
      ]
    });
  }
}

function createDateFromTime(time) {
  const min = time.split(':')[1];
  const hour = time.split(':')[0];
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min);
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
