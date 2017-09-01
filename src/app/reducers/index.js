import {colors, timerOptions} from 'config';
import {createDateFromTime, parseTimeToNumber} from '../libs/tick.js';

const {time, breakTime} = timerOptions;
const savedColor = colors[1];

const getColor = color => {
  window.localStorage.setItem('color', color);
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
  let isTomorrow = false;
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {
        data: action.data,
        time1: ['x'].concat(action.data.map((item, idx, arr) => {
          const time = createDateFromTime(item.time);
          const firstItem =parseInt(arr[0].time.split(':')[0], 10) === 23;
          if (idx < arr.length - 1) {
            if (parseInt(item.time.split(':')[0], 10) === 1) {
              time.setDate(time.getDate() + 1);
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

