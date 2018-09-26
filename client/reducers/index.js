import { combineReducers } from 'redux';
import error from './ErrorReducer';
import session from './SessionReducer';
import stations from './StationsReducer';

export default combineReducers({
  error,
  session,
  stations
});



