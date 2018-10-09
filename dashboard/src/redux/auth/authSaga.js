import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as authUtil from '../../utils/authUtil';

import config from '../../config';
import history from '../history';

import {
  GET_LOGIN_USER_REQUEST,
  getLoginUserSuccess,
  getLoginUserFailure,

  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,

  LOGOUT_REQUEST,
  logoutSuccess,
  logoutFailure,

  UPDATE_PROFILE_REQUEST,
  updateProfileSuccess,
  updateProfileFailure,

} from './authAction';

import {
  openSnackBar,
} from '../ui/uiAction';

import constants from '../../utils/constants';
import * as commonUtil from '../../utils/commonUtil';

function* getLoginUserTask() {
  try {
    yield call(delay, config.LOADING_SCREEN_EXTRA_DELAY);
    const res = yield call(authUtil.getLoginUser);
    if (res.status >= 200 && res.status < 300) {
      const loginUser = yield res.json();
      yield put(getLoginUserSuccess(loginUser));
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Logined as ${loginUser.username}`,
      }));
    } else {
      throw res;
    }
  } catch (error) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(getLoginUserFailure(errorMsg));
  }
}

function* loginTask(action) {
  try {
    const res = yield call(authUtil.login, action.login);
    if (res.status >= 200 && res.status < 300) {
      const payload = yield res.json();
      yield call(authUtil.setAccessToken, payload.accessToken);
      yield put(loginSuccess(payload.loginUser));
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Logined as ${payload.loginUser.username}`,
      }));
    } else {
      throw res;
    }
  } catch (error) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error, {msg401: 'Invalid username or password'});
    console.log(errorMsg);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(loginFailure(errorMsg));
  }
}


function* updateProfileTask(action) {
  try {
    const res = yield call(authUtil.updateProfile, action.loginUser);
    if (res.status >= 200 && res.status < 300) {
      const loginUser = yield res.json();
      yield put(updateProfileSuccess(loginUser));
      yield call(history.goBack);
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Update success`,
      }));
    } else {
      throw res;
    }
  } catch (error) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(updateProfileFailure(error));
  }
}

function* logoutTask() {
  try {
    yield call(authUtil.removeAccessToken);
    yield put(logoutSuccess());
    yield put(openSnackBar({
      variant: constants.SNACKBAR_SUCCESS,
      message: `Logout success`,
    }));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* authSaga() {
  yield takeEvery(GET_LOGIN_USER_REQUEST, getLoginUserTask);
  yield takeEvery(LOGIN_REQUEST, loginTask);
  yield takeEvery(LOGOUT_REQUEST, logoutTask);
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileTask);
}

export default authSaga;