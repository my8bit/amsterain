import {getRainingTicks} from '../libs/tick.js';

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

export const loadReducer = (state = {
  victoryChartData: []
}, action) => {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {
        data: action.data,
        victoryChartData: getRainingTicks(action.data)
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
