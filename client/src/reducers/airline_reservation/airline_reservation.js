import cst from '../../constants/airline_reservation/cst'

const initialStates = {
    data: [],
    status: cst.ADD_FLIGHT,
}

const reservation = (state = initialStates, action) => {
    switch (action.type) {
        case cst.ADD_BOOKING: { // Information preload for the formular
            return Object.assign({}, state, {
                data: action.payload,
                status: action.type
            })
        }
        case cst.ADD_PASSENGER: {
            return Object.assign({}, state, {
                status: action.type
            })
        }
        case cst.ADD_PASSENGER_SUCCESS: {
            return Object.assign({}, state, {
                data: action.payload
            })
        }
        case cst.ADD_PASSENGER_FAILURE: {
            return Object.assign({}, state, {
                status: action.ADD_PASSENGER
            })
        }
        case cst.GET_BOOKINGS: { // Information preload for the formular
            return Object.assign({}, state, {
                data: action.payload,
                status: action.type
            })
        }
        case cst.GET_PASSENGERS: { // Information preload for the formular
            return Object.assign({}, state, {
                data: action.payload,
                status: action.type
            })
        }
        case cst.GET_BOOKINGS_FAILURE: {
            return Object.assign({}, state, {
                status: action.type
            })
        }
        case cst.GET_BOOKINGS_SUCCESS: {
            return Object.assign({}, state, {
                data: action.payload.data,
                status: action.type
            })
        }
        case cst.GET_PASSENGERS_SUCCESS: {
            return Object.assign({}, state, {
                data: action.payload.data,
                status: action.type
            })
        }
        case cst.GET_PASSENGERS_FAILURE: {
            return Object.assign({}, state, {
                status: action.type
            })
        }
        default:
          return state;
    }
}

export default reservation