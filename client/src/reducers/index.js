import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

import airline_reservation from './airline_reservation/airline_reservation'

export default combineReducers({
  booking: airline_reservation,
  auth,
  form: formReducer
});
