import { combineReducers } from 'redux';
import error from './ErrorReducer';
import session from './SessionReducer';
import stations from './StationsReducer';
import routes from './RoutesReducer';
import events from './EventsReducer';

export default combineReducers({
  error,
  session,
  stations,
  routes,
  events
});



