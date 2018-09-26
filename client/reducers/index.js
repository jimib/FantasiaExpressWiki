import { combineReducers } from 'redux';
import error from './ErrorReducer';
import session from './SessionReducer';
import users from './UsersReducer';

export default combineReducers({
  error,
  session,
  users
});



