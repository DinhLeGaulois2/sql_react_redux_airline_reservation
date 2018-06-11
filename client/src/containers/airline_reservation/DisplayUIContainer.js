import React from 'react'
import { connect } from 'react-redux'

import DisplayUIComponent from '../../components/airline_reservation/DisplayUIComponent'
import actions from '../../actions/airline_reservation/reservationAction'

const mapStateToProps = (state) => ({
    status: state.booking.status,
    menuStatus: state.booking.menuStatus
})

const mapDispatchToProps = (dispatch) => ({
    onClickGetPassengers: () => { dispatch(actions.setPassengers()) },
    onClickGetBookings: () => { dispatch(actions.setBookings()) },
})

// You have to connect() to any reducers that you wish to connect to yourself
const DisplayUIContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayUIComponent)

export default DisplayUIContainer

