import cst from '../../constants/airline_reservation/cst'

const initialStates = {
    data: [],
    status: "",
}

const passenger = (state = initialStates, action) => {
    switch (action.type) {
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

export default passenger