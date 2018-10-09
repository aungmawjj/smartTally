export const CROWDAREA_FETCH_LIST_REQUEST = 'CROWDAREA_FETCH_LIST_REQUEST';
export const CROWDAREA_FETCH_LIST_SUCCESS = 'CROWDAREA_FETCH_LIST_SUCCESS';
export const CROWDAREA_FETCH_LIST_FAILURE = 'CROWDAREA_FETCH_LIST_FAILURE';

export const CROWDAREA_SET_CURRENT_ID = 'CROWDAREA_SET_CURRENT_ID';

export const CROWDAREA_FETCH_BY_ID_REQUEST = 'CROWDAREA_FETCH_BY_ID_REQUEST';
export const CROWDAREA_FETCH_BY_ID_SUCCESS = 'CROWDAREA_FETCH_BY_ID_SUCCESS';
export const CROWDAREA_FETCH_BY_ID_FAILURE = 'CROWDAREA_FETCH_BY_ID_FAILURE';

export const CROWDAREA_CREATE_REQUEST = 'CROWDAREA_CREATE_REQUEST';
export const CROWDAREA_CREATE_SUCCESS = 'CROWDAREA_CREATE_SUCCESS';
export const CROWDAREA_CREATE_FAILURE = 'CROWDAREA_CREATE_FAILURE';

export const CROWDAREA_UPDATE_REQUEST = 'CROWDAREA_UPDATE_REQUEST';
export const CROWDAREA_UPDATE_SUCCESS = 'CROWDAREA_UPDATE_SUCCESS';
export const CROWDAREA_UPDATE_FAILURE = 'CROWDAREA_UPDATE_FAILURE';

export const CROWDAREA_DELETE_REQUEST = 'CROWDAREA_DELETE_REQUEST';
export const CROWDAREA_DELETE_SUCCESS = 'CROWDAREA_DELETE_SUCCESS';
export const CROWDAREA_DELETE_FAILURE = 'CROWDAREA_DELETE_FAILURE';


export function fetchCrowdAreaList() {
  return {
    type: CROWDAREA_FETCH_LIST_REQUEST
  };
}

export function fetchCrowdAreaListSuccess(crowdAreaList) {
  return {
    type: CROWDAREA_FETCH_LIST_SUCCESS,
    crowdAreaList,
  };
}

export function fetchCrowdAreaListFailure(error) {
  return {
    type: CROWDAREA_FETCH_LIST_FAILURE,
    error,
  };
}

export function setCurrentCrowdAreaId(currentCrowdAreaId) {
  return {
    type: CROWDAREA_SET_CURRENT_ID,
    currentCrowdAreaId,
  };
}

export function fetchCrowdAreaById(_id) {
  return {
    type: CROWDAREA_FETCH_BY_ID_REQUEST,
    _id,
  };
}

export function fetchCrowdAreaByIdSuccess(crowdArea) {
  return {
    type: CROWDAREA_FETCH_BY_ID_SUCCESS,
    crowdArea,
  };
}

export function fetchCrowdAreaByIdFailure(error) {
  return {
    type: CROWDAREA_FETCH_BY_ID_FAILURE,
    error,
  };
}

export function createCrowdArea(crowdArea) {
  return {
    type: CROWDAREA_CREATE_REQUEST,
    crowdArea,
  };
}

export function createCrowdAreaSuccess(crowdArea) {
  return {
    type: CROWDAREA_CREATE_SUCCESS,
    crowdArea,
  };
}

export function createCrowdAreaFailure(error) {
  return {
    type: CROWDAREA_CREATE_FAILURE,
    error,
  };
}

export function updateCrowdArea(crowdArea) {
  return {
    type: CROWDAREA_UPDATE_REQUEST,
    crowdArea,
  };
}

export function updateCrowdAreaSuccess(crowdArea) {
  return {
    type: CROWDAREA_UPDATE_SUCCESS,
    crowdArea,
  };
}

export function updateCrowdAreaFailure(error) {
  return {
    type: CROWDAREA_UPDATE_FAILURE,
    error,
  };
}


export function deleteCrowdArea(_id) {
  return {
    type: CROWDAREA_DELETE_REQUEST,
    _id,
  };
}

export function deleteCrowdAreaSuccess(_id) {
  return {
    type: CROWDAREA_DELETE_SUCCESS,
    _id,
  };
}

export function deleteCrowdAreaFailure(error) {
  return {
    type: CROWDAREA_DELETE_FAILURE,
    error,
  };
}