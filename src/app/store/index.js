import {representationReducer, timerReducer, userReducer, tooltipReducer, loadReducer} from '../reducers';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  representationReducer,
  loadReducer,
  tooltipReducer,
  timerReducer,
  userReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // extension’s options
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
export const store = createStore(reducers, enhancer);
