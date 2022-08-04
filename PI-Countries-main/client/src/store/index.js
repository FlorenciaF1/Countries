import { configureStore , applyMiddleware } from 'redux'; // createStore
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store = configureStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) // createStore

/* import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer/index';
//import rootReducer from '../reducer';
//import { composeWithDevTools } from  'redux-devtools-extension';
//import thunk from 'redux-thunk';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware))) */