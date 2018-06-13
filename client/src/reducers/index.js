import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

import add from './airline_reservation/add'
import booking from './airline_reservation/booking'
import passenger from './airline_reservation/passenger'

export default combineReducers({
  add, booking, passenger, auth,
  form: formReducer
});
