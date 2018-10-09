export const TOGGLE_NAV_DRAWER = 'TOGGLE_NAV_DRAWER';
export const TOGGLE_TOP_NAV = 'TOGGLE_TOP_NAV';
export const TOGGLE_SCREEN_HEADER = 'TOGGLE_SCREEN_HEADER';

export const SET_APPBAR_TITLE = 'SET_APPBAR_TITLE';
export const SET_VIEW_WIDTH = 'SET_VIEW_WIDTH';
export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';

export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export function openSnackBar(snackbar) {
  return {
    type: OPEN_SNACKBAR,
    snackbar,
  };
};

export function closeSnackBar() {
  return {
    type: CLOSE_SNACKBAR,
  };
};

export function toggleNavDrawer(open) {
  return {
    type: TOGGLE_NAV_DRAWER,
    open,
  };
};

export function toggleTopNavBar(open) {
  return {
    type: TOGGLE_TOP_NAV,
    open,
  };
}

export function toggleScreenHeader(open) {
  return {
    type: TOGGLE_SCREEN_HEADER,
    open,
  };
}

export function setAppBarTitle(title) {
  return {
    type: SET_APPBAR_TITLE,
    title,
  };
};

export function setViewWidth(viewWidth) {
  return {
    type: SET_VIEW_WIDTH,
    viewWidth,
  };
};

export function setScrollPosition(scroll) {
  return {
    type: SET_SCROLL_POSITION,
    scroll
  };
};
