import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'

import airline_reservation from './reducers/airline_reservation/airline_reservation'

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(combineReducers({
    booking: airline_reservation,

    form: reduxFormReducer // mounted under "form"
}), middleware);