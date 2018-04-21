import React from 'react'
import { connect } from 'react-redux'

import actions from '../../actions/airline_reservation/reservationAction'
import AddBookingComponent from '../../components/airline_reservation/AddBookingComponent'

const mapStateToProps = (state) => ({
    data: state.booking.data,
})

const mapDispatchToProps = (dispatch) => ({
    onClickAddBooking: (data) => { dispatch(actions.addBooking(data)) },
})

// You have to connect() to any reducers that you wish to connect to yourself
const AddBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBookingComponent)

export default AddBookingContainer

