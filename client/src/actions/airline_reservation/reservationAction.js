import axios from "axios"

import cst from '../../constants/airline_reservation/cst'

const reservationAction = {
    addBooking: (data) => {
        return (dispatch, getState) => {
            let st = getState().add.data[0]
            let anArray = {};

            anArray.classSeatCapacity = {
                newSeatCapacity: st.flight[data.flightIndex].classSeatCapacities[data.classSeatCapacitiesIndex].seatCapacity - 1,  //<<<<<<<< the name is DIFFERENT ...
                travelClassId: st.flight[data.flightIndex].classSeatCapacities[data.classSeatCapacitiesIndex].travelClass.id,
                flightId: st.flight[data.flightIndex].id,
            }
            anArray.booking = {
                bookingDate: new Date(),
                passengerId: st.passengers[data.passengerIndex].id,
                bookingStatusId: 2,
                ticketTypeId: st.ticketType[data.ticketTypeIndex].id,
                flightId: st.flight[data.flightIndex].id,
                travelClassId: st.flight[data.flightIndex].classSeatCapacities[data.classSeatCapacitiesIndex].travelClass.id,
            }
            anArray.payment = {
                paymentDate: new Date(),
                paymentAmount: st.flight[data.flightIndex].classSeatCapacities[data.classSeatCapacitiesIndex].price,
                paymentMethodId: st.paymentMethod[data.paymentMethodIndex].id,
                paymentStatusId: 1,
            }
            axios.post("http://localhost:3090/api/add/booking", anArray, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(response => {
                    axios.get("http://localhost:3090/api/get/bookings", {
                        headers: {
                            'authorization': localStorage.getItem('token')
                        }
                    })
                        .then(data => {
                            dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                        })
                        .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
                })
                .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
        }
    },

    addPassenger: (data) => {
        return dispatch => {
            axios.post("http://localhost:3090/api/add/passenger", data, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(response => {
                    dispatch({ type: cst.ADD_PASSENGERS_SUCCESS, payload: response })
                })
                .catch(err => dispatch({ type: cst.ADD_PASSENGERS_FAILURE }))
        }
    },

    setPassengers: () => {
        return dispatch =>
            axios.get("http://localhost:3090/api/get/passengers", {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(data => {
                    dispatch({ type: cst.GET_PASSENGERS_SUCCESS, payload: data })
                })
                .catch(err => dispatch({ type: cst.GET_PASSENGERS_FAILURE }))
    },

    setBookings: () => {
        return (dispatch) =>
            axios.get("http://localhost:3090/api/get/bookings", {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(data => {
                    dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                })
                .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
    },

    deleteBookingById: (bId) => {
        return (dispatch) =>
            axios.delete("http://localhost:3090/api/delete/booking/" + bId)
                .then(data => {
                    axios.get("http://localhost:3090/api/get/bookings", {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                        .then(data => {
                            dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                        })
                        .catch(err => {
                            dispatch({ type: cst.GET_BOOKINGS_FAILURE })
                            alert("Error of Deletion of Booking number " + bId + ", err: " + err)
                        })

                }).catch(err => alert("Error of Deletion, err: " + err))
    },


    deletePassengerById: (pId) => {
        return (dispatch) =>
            axios.delete("http://localhost:3090/api/delete/passenger/" + pId, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(data => {
                    axios.get("http://localhost:3090/api/get/passengers", {
                        headers: {
                            'authorization': localStorage.getItem('token')
                        }
                    })
                        .then(data => {
                            dispatch({ type: cst.GET_PASSENGERS_SUCCESS, payload: data })
                        })
                        .catch(err => dispatch({ type: cst.GET_PASSENGERS_FAILURE }))
                }).catch(err => alert("Error of Deletion, err: " + err))
    },

    setStatus: (actionStatus) => {
        return dispatch => {
            if (actionStatus === cst.ADD_BOOKING) {
                axios.get("http://localhost:3090/api/get/info4Booking", {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                    .then(data => {
                        let anArray = [];
                        anArray.push(data.data)
                        dispatch({
                            type: cst.ADD_BOOKING,
                            payload: anArray
                        })
                    })
            }
            else dispatch({ type: actionStatus })
        }
    }
}

export default reservationAction