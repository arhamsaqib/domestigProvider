import {combineReducers} from 'redux';
import Current from './currentUserReducer';
import rememberMeReducer from './rememberMeReducer';

export const allReducers = combineReducers({
  currentUser: Current,
  rememberMe: rememberMeReducer,
});
