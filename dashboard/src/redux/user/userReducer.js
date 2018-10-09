import * as commonUtil from '../../utils/commonUtil';

import {
  USER_FETCH_LIST_REQUEST,
  USER_FETCH_LIST_SUCCESS,
  USER_FETCH_LIST_FAILURE,

  USER_SET_CURRENT_ID,

  USER_FETCH_BY_ID_REQUEST,
  USER_FETCH_BY_ID_SUCCESS,
  USER_FETCH_BY_ID_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
} from './userAction';

import {
  LOGOUT_SUCCESS,
} from '../auth/authAction';

const initialState = {
  userList: [],
  currentUserId: null,

  fetchInProgress: false,
  uploadInProgress: false,

  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {

  case LOGOUT_SUCCESS:
    return initialState;

  case USER_FETCH_LIST_REQUEST:
    return {
      ...state,
      fetchInProgress: true,
    };

  case USER_FETCH_LIST_SUCCESS:
    return {
      ...state,
      fetchInProgress: false,
      userList: action.userList,
    };

  case USER_FETCH_LIST_FAILURE:
    return {
      ...state,
      fetchInProgress: false,
    };

  case USER_SET_CURRENT_ID:
    return {
      ...state,
      currentUserId: action.currentUserId,
    };

  case USER_FETCH_BY_ID_REQUEST:
    return {
      ...state,
      fetchInProgress: true,
    };

  case USER_FETCH_BY_ID_SUCCESS:
    return {
      ...state,
      fetchInProgress: false,
      userList: commonUtil.updateObjectInList(state.userList, action.user),
    };

  case USER_FETCH_BY_ID_FAILURE:
    return {
      ...state,
      fetchInProgress: false,
    };
  
  case USER_CREATE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case USER_CREATE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      userList: state.userList.concat(action.user),
    };

  case USER_CREATE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };

  case USER_UPDATE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case USER_UPDATE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      userList: commonUtil.updateObjectInList(state.userList, action.user),
    };

  case USER_UPDATE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };

  case USER_DELETE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };

  case USER_DELETE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      userList: state.userList.filter(user => user._id !== action._id),
    };

  case USER_DELETE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: null,
    };

  default:
    return state;
  }
}

export default userReducer;