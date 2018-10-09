import auth from './auth/authReducer';
import ui from './ui/uiReducer';
import crowdArea from './crowdArea/crowdAreaReducer';

import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth,
  ui,
  crowdArea,
});

export default reducer;