import authSaga from './auth/authSaga';
import crowdAreaSaga from './crowdArea/crowdAreaSaga';

import { all } from 'redux-saga/effects';

function* saga() {
  yield all([
    authSaga(),
    crowdAreaSaga(),
  ]);
}

export default saga;