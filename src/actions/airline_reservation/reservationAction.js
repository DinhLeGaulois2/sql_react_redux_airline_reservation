import axios from "axios"

import cst from '../../constants/airline_reservation/cst'

const reservationAction = {
    addBooking: (data) => {
        return (dispatch, getState) => {
            let st = getState().booking.data[0]
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
            axios.post("/api/add/booking", anArray)
                .then(response => {
                    axios.get("/api/get/bookings")
                        .then(data => {
                            dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                            dispatch({ type: cst.MENU_DISPLAY })
                        })
                        .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
                })
                .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
        }
    },

    addPassenger: (data) => {
        return dispatch => {
            axios.post("/api/add/passenger", data)
                .then(response => {
                    dispatch({ type: cst.ADD_PASSENGERS_SUCCESS, payload: response })
                })
                .catch(err => dispatch({ type: cst.ADD_PASSENGERS_FAILURE }))
        }
    },

    setPassengers: () => {
        return dispatch =>
            axios.get("/api/get/passengers")
                .then(data => {
                    dispatch({ type: cst.GET_PASSENGERS_SUCCESS, payload: data })
                    dispatch({ type: cst.MENU_DISPLAY })
                })
                .catch(err => dispatch({ type: cst.GET_PASSENGERS_FAILURE }))
    },

    setBookings: () => {
        return (dispatch) =>
            axios.get("/api/get/bookings")
                .then(data => {
                    dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                    dispatch({ type: cst.MENU_DISPLAY })
                })
                .catch(err => dispatch({ type: cst.GET_BOOKINGS_FAILURE }))
    },

    deleteBookingById: (bId) => {
        return (dispatch) =>
            axios.delete("/api/delete/booking/" + bId)
                .then(data => {
                    axios.get("/api/get/bookings")
                        .then(data => {
                            dispatch({ type: cst.GET_BOOKINGS_SUCCESS, payload: data })
                            dispatch({ type: cst.MENU_DISPLAY })
                        })
                        .catch(err => {
                            dispatch({ type: cst.GET_BOOKINGS_FAILURE })
                            alert("Error of Deletion of Booking number " + bId + ", err: " + err)
                        })

                }).catch(err => alert("Error of Deletion, err: " + err))
    },


    deletePassengerById: (pId) => {
        return (dispatch) =>
            axios.delete("/api/delete/passenger/" + pId)
                .then(data => {
                    axios.get("/api/get/passengers")
                        .then(data => {
                            dispatch({ type: cst.GET_PASSENGERS_SUCCESS, payload: data })
                            dispatch({ type: cst.MENU_DISPLAY })
                        })
                        .catch(err => dispatch({ type: cst.GET_PASSENGERS_FAILURE }))
                }).catch(err => alert("Error of Deletion, err: " + err))
    },

    setStatus: (mainStatus, actionStatus) => {
        return dispatch => {
            if (mainStatus.length > 0) dispatch({ type: mainStatus })
            if (actionStatus.length > 0) {
                if (actionStatus == cst.ADD_BOOKING) {
                    axios.get("/api/get/info4Booking")
                        .then(data => {
                            let anArray = [];
                            anArray.push(data.data)
                            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                            console.log("Preload before booking, data: " + JSON.stringify(anArray, null, 5))
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
}

export default reservationAction