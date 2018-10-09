import history from '../history';
import *  as crudUtil from '../../utils/crudUtil';

import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import {
  CROWDAREA_FETCH_LIST_REQUEST,
  CROWDAREA_FETCH_BY_ID_REQUEST,
  CROWDAREA_CREATE_REQUEST,
  CROWDAREA_UPDATE_REQUEST,
  CROWDAREA_DELETE_REQUEST,

  fetchCrowdAreaListSuccess,
  fetchCrowdAreaListFailure,

  fetchCrowdAreaByIdSuccess,
  fetchCrowdAreaByIdFailure,

  createCrowdAreaSuccess,
  createCrowdAreaFailure,

  updateCrowdAreaSuccess,
  updateCrowdAreaFailure,

  deleteCrowdAreaSuccess,
  deleteCrowdAreaFailure,
} from './crowdAreaAction';

import {
  openSnackBar,
} from '../ui/uiAction';

import constants from '../../utils/constants';
import * as commonUtil from '../../utils/commonUtil';

function* fetchListTask(action) {
  try {
    const res = yield call(crudUtil.getList, constants.MODEL_CROWDAREA);
    if (res.status >= 200 && res.status < 300) {
      const crowdAreaList = yield res.json();
      yield put(fetchCrowdAreaListSuccess(crowdAreaList));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(fetchCrowdAreaListFailure(errorMsg));
  }
}

function* fetchByIdTask(action) {
  try {
    const res = yield call(crudUtil.getById, constants.MODEL_CROWDAREA, action._id);
    if (res.status >= 200 && res.status < 300) {
      const crowdArea = yield res.json();
      yield put(fetchCrowdAreaByIdSuccess(crowdArea));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(fetchCrowdAreaByIdFailure(errorMsg));
  }
}

function* createTask(action) {
  try{
    const res = yield call(crudUtil.create, constants.MODEL_CROWDAREA, action.crowdArea);
    if (res.status >= 200 && res.status < 300) {
      const crowdArea = yield res.json();
      yield put(createCrowdAreaSuccess(crowdArea));
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
    yield put(createCrowdAreaFailure(errorMsg));
  }
}

function* updateTask(action) {
  try{
    const res = yield call(crudUtil.update, constants.MODEL_CROWDAREA, action.crowdArea);
    if (res.status >= 200 && res.status < 300) {
      const crowdArea = yield res.json();
      yield put(updateCrowdAreaSuccess(crowdArea));
    } else {
      throw res;
    }
  } catch (error ) {
    const errorMsg = yield call(commonUtil.getErrorMsg, error);
    yield put(openSnackBar({
      variant: constants.SNACKBAR_ERROR,
      message: errorMsg,
    }));
    yield put(updateCrowdAreaFailure(errorMsg));
  }
}

function* deleteTask(action) {
  try{
    const res = yield call(crudUtil._delete, constants.MODEL_CROWDAREA, action._id);
    if (res.status >= 200 && res.status < 300) {
      yield put(deleteCrowdAreaSuccess(action._id));
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
    yield put(deleteCrowdAreaFailure(errorMsg));
  }
}

function*  crowdAreaSaga() {
  yield takeEvery(CROWDAREA_FETCH_LIST_REQUEST, fetchListTask);
  yield takeEvery(CROWDAREA_FETCH_BY_ID_REQUEST, fetchByIdTask);
  yield takeEvery(CROWDAREA_CREATE_REQUEST, createTask);
  yield takeEvery(CROWDAREA_UPDATE_REQUEST, updateTask);
  yield takeEvery(CROWDAREA_DELETE_REQUEST, deleteTask);
}
  
export default crowdAreaSaga;