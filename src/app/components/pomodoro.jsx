import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import C3Chart from 'react-c3js';
import {loadWeerAction} from '../libs/firebase.auth';
const chartId = 'chart';

class TimerWidget extends Component {
  componentDidMount() {}
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.time1, this.props.time1);
  }
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadWeerAction());
  }

  /*

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
        dispatch({
          type: 'CHANGE_TIP',
          value,
          time
        });
      }
    });
    function showFocusLine($rect) {
      const x = Math.floor(~~$rect.getAttribute('x') + ~~$rect.getAttribute('width') / 2);
      $focusLine.attr({x1: x, x2: x}).style('visibility', 'visible');
    }
  }
 */
  render() {
    const {preceptoin1, time1, dispatch} = this.props;
    console.log('************************************** RENDER *************************************************');

    const ch = ch => {
      this.chartWidth = ch && ch.chart.element;
      console.log(this.chartWidth);
      console.log('++++++++++++++++++++++++++++++++++++ REF ++++++++++++++++++++++++++++++++++++++++');

      const element = ch && ch.chart.element;
      if (element) {
        const $$ = ch.chart.internal;
        const $el = window.d3.select(element);
        const $focusLine = $el.select('.c3-xgrid-focus > line');
        const $rect = $el.select('.c3-event-rects');
        // console.log('++++++++++++++++++++++++++++++++++++ REEEECT ++++++++++++++++++++++++++++++++++++++++');
        // console.log($rect);
        $rect.on('touchmove', () => {
          // console.log($rect);
          const touch = window.d3.event.changedTouches[0];
          const $rect2 = document.elementFromPoint(touch.clientX, touch.clientY);
          // console.log($rect2, touch);
          if ($rect2) {
            const className = $rect2.getAttribute('class');
            const index = className && dispatch && ~~className.match(/\d+$/);
            const selectedData = $$.filterTargetsToShow($$.data.targets).map(t => {
              return $$.addName($$.getValueOnIndex(t.values, index));
            });
            showFocusLine($rect2);
            const min = selectedData[0].x.getMinutes() < 10 ? `0${selectedData[0].x.getMinutes()}` : selectedData[0].x.getMinutes();
            const time = `${selectedData[0].x.getHours()}:${min}`;
            const value = selectedData[0].value;
            console.log(time, value);
            dispatch({
              type: 'CHANGE_TIP',
              value,
              time
            });
          }
          function showFocusLine($rect2) {
            // TODO
            const x = Math.floor(~~$rect2.getAttribute('x') + ~~$rect2.getAttribute('width') / 2);
            $focusLine.attr({x1: x, x2: x}).style('visibility', 'visible');
          }
        });
      }

      document.querySelector('.c3-event-rects').addEventListener('touchmove',
        () => {
          // const touch = window.d3.event.changedTouches[0];
          // const $rect = document.elementFromPoint(touch.clientX, touch.clientY);
          // console.log(e);
          /*
          if ($rect) {
            className = $rect.getAttribute('class');
            const index = className && ~~className.match(/\d+$/);

            const selectedData = $$.filterTargetsToShow($$.data.targets).map(t => {
              return $$.addName($$.getValueOnIndex(t.values, index));
            });
            showFocusLine($rect);
            const min = selectedData[0].x.getMinutes() < 10 ? `0${selectedData[0].x.getMinutes()}` : selectedData[0].x.getMinutes();
            const time = `${selectedData[0].x.getHours()}:${min}`;
            const value = selectedData[0].value;
            dispatch({
              type: 'CHANGE_TIP',
              value,
              time
            });
          }
          */
        },
        true);
      // function showFocusLine($rect) {
      //   const x = Math.floor(~~$rect.getAttribute('x') + ~~$rect.getAttribute('width') / 2);
      //   document.querySelector('.c3-xgrid-focus > line').attr({x1: x, x2: x}).style('visibility', 'visible');
      // }
    };
    return (
      <div
        className="container"
        onTouchMove={function () {
          // const touch = window.d3.event.changedTouches[0];
          // const $rect = document.elementFromPoint(touch.clientX, touch.clientY);
          // console.log(touch, $rect);
        }}
        >
        <C3Chart
          className="chart"
          id={chartId}
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
            },
            position: () => {
              const d3evt = window.d3.event;
              const event = (d3evt.type === 'touchmove') ?
                d3evt.changedTouches[0] :
                d3evt;
              return {top: event.clientY, left: event.clientX};
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
  data: React.PropTypes.array,
  time1: React.PropTypes.array,
  preceptoin1: React.PropTypes.array,
  value: React.PropTypes.number.isRequired,
  time: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {value, time} = store.tooltipReducer;
  const {data, time1, preceptoin1} = store.loadReducer;
  return {data, value, time, time1, preceptoin1};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
