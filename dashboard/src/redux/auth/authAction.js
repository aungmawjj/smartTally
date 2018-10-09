export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const GET_LOGIN_USER_REQUEST = 'GET_LOGIN_USER_REQUEST';
export const GET_LOGIN_USER_SUCCESS = 'GET_LOGIN_USER_SUCCESS';
export const GET_LOGIN_USER_FAILURE = 'GET_LOGIN_USER_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export function login(login) {
  return {
    type: LOGIN_REQUEST,
    login
  };
}

export function loginSuccess(loginUser) {
  return {
    type: LOGIN_SUCCESS,
    loginUser
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function logout() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}

export function getLoginUser() {
  return {
    type: GET_LOGIN_USER_REQUEST
  };
}

export function getLoginUserSuccess(loginUser) {
  return {
    type: GET_LOGIN_USER_SUCCESS,
    loginUser
  };
}

export function getLoginUserFailure(error) {
  return {
    type: GET_LOGIN_USER_FAILURE,
    error
  };
}


export function updateProfile(loginUser) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    loginUser,
  };
}

export function updateProfileSuccess(loginUser) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    loginUser,
  };
}

export function updateProfileFailure(error) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    error,
  };
}