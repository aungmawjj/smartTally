import config from '../config';
import reducer from './reducer';
import saga from './saga';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  level: 'debug'
});

const middlewares = [
  sagaMiddleware,
  config.DEBUG && logger
].filter(Boolean);

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(saga);

export default store;