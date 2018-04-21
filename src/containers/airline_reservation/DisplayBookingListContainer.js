import React from 'react'
import { connect } from 'react-redux'

import actions from '../../actions/airline_reservation/reservationAction'
import DisplayBookingListComponent from '../../components/airline_reservation/DisplayBookingListComponent'

const mapStateToProps = (state) => ({
    bookings: state.booking.data
})

const mapDispatchToProps = (dispatch) => ({
    onClickDelete: (bId) => { dispatch(actions.deleteBookingById(bId))}
})

// You have to connect() to any reducers that you wish to connect to yourself
const DisplayBookingListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayBookingListComponent)

export default DisplayBookingListContainer