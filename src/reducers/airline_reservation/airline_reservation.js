import cst from '../../constants/airline_reservation/cst'

const initialStates = {
    data: [],
    activeId: 0,
    category: 0,
    previousStatus: cst.ADD_FLIGHT,
    status: cst.ADD_FLIGHT,
    menuStatus: cst.MENU_NEUTRAL
}

const reservation = (state = initialStates, action) => {
    switch (action.type) {
        // case cst.ADD_AIRPLANE: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
        case cst.ADD_BOOKING: { // Information preload for the formular
            return Object.assign({}, state, {
                data: action.payload,
                status: action.type
            })
        }
        // case cst.ADD_FLIGHT: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
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
        // case cst.DELETE_BOOKING_BY_ID: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
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
        // case cst.GET_FLIGHT_INFO: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
        // case cst.GET_INFO_4_BOOKING: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
        // case cst.GET_PASSENGER_BY_ID: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
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
        case cst.MENU_ADD: {
            return Object.assign({}, state, {
                menuStatus: action.type
            })
        }
        case cst.MENU_DISPLAY: {
            return Object.assign({}, state, {
                menuStatus: action.type
            })
        }
        // case cst.UPDATE_BOOKING_STATUS: {
        //     return Object.assign({}, state, {
        //         data: action.payload
        //     })
        // }
    }
    return state;
}

export default reservation