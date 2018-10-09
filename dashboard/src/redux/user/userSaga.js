import history from '../history';
import *  as crudUtil from '../../utils/crudUtil';

import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import {
  USER_FETCH_LIST_REQUEST,
  USER_FETCH_BY_ID_REQUEST,
  USER_CREATE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_DELETE_REQUEST,

  fetchUserListSuccess,
  fetchUserListFailure,

  fetchUserByIdSuccess,
  fetchUserByIdFailure,

  createUserSuccess,
  createUserFailure,

  updateUserSuccess,
  updateUserFailure,

  deleteUserSuccess,
  deleteUserFailure,
} from './userAction';

import {
  openSnackBar,
} from '../ui/uiAction';

import constants from '../../utils/constants';
import * as commonUtil from '../../utils/commonUtil';

function* fetchListTask(action) {
  try {
    const res = yield call(crudUtil.getList, constants.MODEL_USER, action.filter);
    if (res.status >= 200 && res.status < 300) {
      const userList = yield res.json();
      yield put(fetchUserListSuccess(userList));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(fetchUserListFailure(errorMsg));
  }
}

function* fetchByIdTask(action) {
  try {
    const res = yield call(crudUtil.getById, constants.MODEL_USER, action._id);
    if (res.status >= 200 && res.status < 300) {
      const user = yield res.json();
      yield put(fetchUserByIdSuccess(user));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(fetchUserByIdFailure(errorMsg));
  }
}

function* createTask(action) {
  try{
    const res = yield call(crudUtil.create, constants.MODEL_USER, action.user);
    if (res.status >= 200 && res.status < 300) {
      const user = yield res.json();
      yield put(createUserSuccess(user));
      yield call(history.goBack);
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Create success`,
      }));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(createUserFailure(errorMsg));
  }
}

function* updateTask(action) {
  try{
    const res = yield call(crudUtil.update, constants.MODEL_USER, action.user);
    if (res.status >= 200 && res.status < 300) {
      const user = yield res.json();
      yield put(updateUserSuccess(user));
      yield call(history.goBack);
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Update success`,
      }));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(updateUserFailure(errorMsg));
  }
}

function* deleteTask(action) {
  try{
    const res = yield call(crudUtil._delete, constants.MODEL_USER, action._id);
    if (res.status >= 200 && res.status < 300) {
      yield put(deleteUserSuccess(action._id));
      yield call(history.goBack);
      yield put(openSnackBar({
        variant: constants.SNACKBAR_SUCCESS,
        message: `Delete success`,
      }));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(deleteUserFailure(errorMsg));
  }
}

function*  userSaga() {
  yield takeEvery(USER_FETCH_LIST_REQUEST, fetchListTask);
  yield takeEvery(USER_FETCH_BY_ID_REQUEST, fetchByIdTask);
  yield takeEvery(USER_CREATE_REQUEST, createTask);
  yield takeEvery(USER_UPDATE_REQUEST, updateTask);
  yield takeEvery(USER_DELETE_REQUEST, deleteTask);
}
  
export default userSaga;