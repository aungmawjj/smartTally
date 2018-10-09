export const USER_FETCH_LIST_REQUEST = 'USER_FETCH_LIST_REQUEST';
export const USER_FETCH_LIST_SUCCESS = 'USER_FETCH_LIST_SUCCESS';
export const USER_FETCH_LIST_FAILURE = 'USER_FETCH_LIST_FAILURE';

export const USER_SET_CURRENT_ID = 'USER_SET_CURRENT_ID';

export const USER_FETCH_BY_ID_REQUEST = 'USER_FETCH_BY_ID_REQUEST';
export const USER_FETCH_BY_ID_SUCCESS = 'USER_FETCH_BY_ID_SUCCESS';
export const USER_FETCH_BY_ID_FAILURE = 'USER_FETCH_BY_ID_FAILURE';

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';


export function fetchUserList(filter) {
  return {
    type: USER_FETCH_LIST_REQUEST,
    filter,
  };
}

export function fetchUserListSuccess(userList) {
  return {
    type: USER_FETCH_LIST_SUCCESS,
    userList,
  };
}

export function fetchUserListFailure(error) {
  return {
    type: USER_FETCH_LIST_FAILURE,
    error,
  };
}

export function setCurrentUserId(currentUserId) {
  return {
    type: USER_SET_CURRENT_ID,
    currentUserId,
  };
}

export function fetchUserById(_id) {
  return {
    type: USER_FETCH_BY_ID_REQUEST,
    _id,
  };
}

export function fetchUserByIdSuccess(user) {
  return {
    type: USER_FETCH_BY_ID_SUCCESS,
    user,
  };
}

export function fetchUserByIdFailure(error) {
  return {
    type: USER_FETCH_BY_ID_FAILURE,
    error,
  };
}

export function createUser(user) {
  return {
    type: USER_CREATE_REQUEST,
    user,
  };
}

export function createUserSuccess(user) {
  return {
    type: USER_CREATE_SUCCESS,
    user,
  };
}

export function createUserFailure(error) {
  return {
    type: USER_CREATE_FAILURE,
    error,
  };
}

export function updateUser(user) {
  return {
    type: USER_UPDATE_REQUEST,
    user,
  };
}

export function updateUserSuccess(user) {
  return {
    type: USER_UPDATE_SUCCESS,
    user,
  };
}

export function updateUserFailure(error) {
  return {
    type: USER_UPDATE_FAILURE,
    error,
  };
}


export function deleteUser(_id) {
  return {
    type: USER_DELETE_REQUEST,
    _id,
  };
}

export function deleteUserSuccess(_id) {
  return {
    type: USER_DELETE_SUCCESS,
    _id,
  };
}

export function deleteUserFailure(error) {
  return {
    type: USER_DELETE_FAILURE,
    error,
  };
}