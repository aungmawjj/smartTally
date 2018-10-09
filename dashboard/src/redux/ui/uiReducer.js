import {
  TOGGLE_NAV_DRAWER,
  TOGGLE_TOP_NAV,
  TOGGLE_SCREEN_HEADER,

  SET_APPBAR_TITLE,
  SET_VIEW_WIDTH,
  SET_SCROLL_POSITION,

  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from './uiAction';

const initialState = {
  appBarTitle: 'Smart Tally',

  navDrawerOpen: false,
  topNavOpen: false,
  screenHeaderOpen: false,

  scroll: {},
  viewWidth: 0,
  snackbar: {},
};

function uiReducer(state = initialState, action) {
  switch(action.type) {

  case TOGGLE_NAV_DRAWER:
    return {
      ...state,
      navDrawerOpen: action.open,
    };

  case TOGGLE_TOP_NAV:
    return {
      ...state,
      topNavOpen: action.open,
    };

  case TOGGLE_SCREEN_HEADER:
    return {
      ...state,
      screenHeaderOpen: action.open,
    };

  case SET_APPBAR_TITLE:
    return {
      ...state,
      appBarTitle: action.title,
    };

  case SET_VIEW_WIDTH:
    return {
      ...state,
      viewWidth: action.viewWidth,
    };

  case SET_SCROLL_POSITION:
    return {
      ...state,
      scroll: {
        ...state.scroll,
        ...action.scroll
      }
    };

  case OPEN_SNACKBAR:
    return {
      ...state,
      snackbar: {
        ...action.snackbar,
        open: true,
      },
    };

  case CLOSE_SNACKBAR:
    return {
      ...state,
      snackbar: {
        ...state.snackbar,
        open: false,
      }
    };

  default:
    return state;
  }
}

export default uiReducer;