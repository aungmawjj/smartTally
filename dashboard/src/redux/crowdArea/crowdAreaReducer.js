import * as commonUtil from '../../utils/commonUtil';

import {
  CROWDAREA_FETCH_LIST_REQUEST,
  CROWDAREA_FETCH_LIST_SUCCESS,
  CROWDAREA_FETCH_LIST_FAILURE,

  CROWDAREA_SET_CURRENT_ID,

  CROWDAREA_FETCH_BY_ID_REQUEST,
  CROWDAREA_FETCH_BY_ID_SUCCESS,
  CROWDAREA_FETCH_BY_ID_FAILURE,

  CROWDAREA_UPDATE_REQUEST,
  CROWDAREA_UPDATE_SUCCESS,
  CROWDAREA_UPDATE_FAILURE,

  CROWDAREA_CREATE_REQUEST,
  CROWDAREA_CREATE_SUCCESS,
  CROWDAREA_CREATE_FAILURE,

  CROWDAREA_DELETE_REQUEST,
  CROWDAREA_DELETE_SUCCESS,
  CROWDAREA_DELETE_FAILURE,
} from './crowdAreaAction';

import {
  LOGOUT_SUCCESS,
} from '../auth/authAction';

const initialState = {
  crowdAreaList: [],
  currentCrowdAreaId: null,

  fetchInProgress: false,
  uploadInProgress: false,

  error: null,
};

function crowdAreaReducer(state = initialState, action) {
  switch (action.type) {

  case LOGOUT_SUCCESS:
    return initialState;

  case CROWDAREA_FETCH_LIST_REQUEST:
    return {
      ...state,
      fetchInProgress: true,
    };

  case CROWDAREA_FETCH_LIST_SUCCESS:
    return {
      ...state,
      fetchInProgress: false,
      crowdAreaList: action.crowdAreaList,
    };

  case CROWDAREA_FETCH_LIST_FAILURE:
    return {
      ...state,
      fetchInProgress: false,
    };
  
  case CROWDAREA_SET_CURRENT_ID:
    return {
      ...state,
      currentCrowdAreaId: action.currentCrowdAreaId,
    };

  case CROWDAREA_FETCH_BY_ID_REQUEST:
    return {
      ...state,
      fetchInProgress: true,
    };

  case CROWDAREA_FETCH_BY_ID_SUCCESS:
    return {
      ...state,
      fetchInProgress: false,
      crowdAreaList: commonUtil.updateObjectInList(state.crowdAreaList, action.crowdArea),
    };

  case CROWDAREA_FETCH_BY_ID_FAILURE:
    return {
      ...state,
      fetchInProgress: false,
    };
  
  case CROWDAREA_CREATE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case CROWDAREA_CREATE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      crowdAreaList: state.crowdAreaList.concat(action.crowdArea),
    };

  case CROWDAREA_CREATE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };

  case CROWDAREA_UPDATE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case CROWDAREA_UPDATE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      crowdAreaList: commonUtil.updateObjectInList(state.crowdAreaList, action.crowdArea),
    };

  case CROWDAREA_UPDATE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };

  case CROWDAREA_DELETE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case CROWDAREA_DELETE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      crowdAreaList: state.crowdAreaList.filter(crowdArea => crowdArea._id !== action._id)
    };

  case CROWDAREA_DELETE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: null,
    };

  default:
    return state;
  }
}

export default crowdAreaReducer;