import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,

  GET_LOGIN_USER_REQUEST,
  GET_LOGIN_USER_SUCCESS,
  GET_LOGIN_USER_FAILURE,
} from './authAction';

const initialState = {
  isAuthorized: false,
  loginUser: null,

  fetchInProgress: true,
  uploadInProgress: false,

  error: null,
};

function auth(state = initialState, action) {
  switch(action.type) {

  case LOGIN_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };
  
  case LOGIN_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      isAuthorized: true,
      loginUser: action.loginUser,
    };
  
  case LOGIN_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      isAuthorized: false,
      error: action.error,
    };
  
  case LOGOUT_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };
  
  case LOGOUT_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      isAuthorized: false,
      loginUser: null,
    };
  
  case LOGOUT_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };
  
  case GET_LOGIN_USER_REQUEST:
    return {
      ...state,
      fetchInProgress: true,
    };
  
  case GET_LOGIN_USER_SUCCESS:
    return {
      ...state,
      fetchInProgress: false,
      isAuthorized: true,
      loginUser: action.loginUser,
    };
  
  case GET_LOGIN_USER_FAILURE:
    return {
      ...state,
      fetchInProgress: false,
    };

  case UPDATE_PROFILE_REQUEST:
    return {
      ...state,
      uploadInProgress: true,
      error: null,
    };
  
  case UPDATE_PROFILE_SUCCESS:
    return {
      ...state,
      uploadInProgress: false,
      loginUser: action.loginUser,
    };

  case UPDATE_PROFILE_FAILURE:
    return {
      ...state,
      uploadInProgress: false,
      error: action.error,
    };
  
  default:
    return state;
  }
}

export default auth;