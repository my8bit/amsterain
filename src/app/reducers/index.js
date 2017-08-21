import {colors, timerOptions} from 'config';
import {createDateFromTime} from '../libs/tick.js';

const {time, breakTime} = timerOptions;
const savedColor = /* localStorage.getItem('color') || */ colors[1]; // TODO: check if there are localstorage

const getColor = color => {
  localStorage.setItem('color', color);
  return {color};
};

export const representationReducer = (state = {color: savedColor}, action) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      return getColor(action.color);
    default:
      return state;
  }
};

export const userReducer = (state = {name: '', photo: ''}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        name: action.name,
        photo: action.photo
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        name: ''
      });
    case 'LOGIN':
      return Object.assign({}, state, {
        name: action.name,
        photo: action.photo
      });
    case 'UNAUTHORIZED':
      return state;
    default:
      return state;
  }
};

export const loadReducer = (state = {time1: [], preceptoin1: [], data: []}, action) => {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {
        data: action.data,
        time1: ['x'].concat(action.data.map((item, idx, arr) => {
          const time = createDateFromTime(item.time);
          if (idx < arr.length - 1) {
            if (parseInt(item.time.split(':')[0], 10) - parseInt(arr[idx + 1].time.split(':')[0], 10) === 23) {
              time.setDate(time.getDate() - 1);
            }
          }
          return time;
        })),
        preceptoin1: ['time'].concat(action.data.map(item => item.preceptoin))
      });
    default:
      return state;
  }
};

export const tooltipReducer = (state = {value: 0, time: ''}, action) => {
  switch (action.type) {
    case 'CHANGE_TIP':
      return Object.assign({}, state, {
        value: action.value,
        time: action.time // `${action.time}:${action.time}`
      });
    default:
      return state;
  }
};

export const timerReducer = (state = {
  time,
  startTime: /* parseInt(localStorage.getItem('startTime'), 10) || */ 0,
  isBreak: true
}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      // TODO fix the bug - blinking of outated value
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    case 'STOP':
      // localStorage.setItem('startTime', 0);
      // console.log('time: state.isBreak ? breakTime : time,', state.isBreak);
      return Object.assign({}, state, {
        startTime: 0,
        time: state.isBreak ? breakTime : time,
        isBreak: !state.isBreak
      });
    case 'RESET':
      // localStorage.setItem('startTime', 0);
      return Object.assign({}, state, {
        startTime: 0,
        time,
        isBreak: false
      });
    case 'START':
      // localStorage.setItem('startTime', action.startTime);
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    default:
      return state;
  }
};
