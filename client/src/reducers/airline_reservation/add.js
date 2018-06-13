import cst from '../../constants/airline_reservation/cst'

const initialStates = {
    data: [],
    status: "",
}

const add = (state = initialStates, action) => {
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
        default:
          return state;
    }
}

export default add