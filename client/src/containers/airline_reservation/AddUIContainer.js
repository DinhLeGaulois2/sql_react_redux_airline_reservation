import React from 'react'
import { connect } from 'react-redux'

import actions from '../../actions/airline_reservation/reservationAction'
import AddUIComponent from '../../components/airline_reservation/AddUIComponent'

const mapStateToProps = (state) => ({
    status: state.booking.status,
    menuStatus: state.booking.menuStatus
})

const mapDispatchToProps = (dispatch) => ({
    onClickAddBooking: (p1, p2) => { dispatch(actions.setStatus(p1, p2)) },
    onClickAddPassenger: (p1, p2) => { dispatch(actions.setStatus(p1, p2)) }
})

// You have to connect() to any reducers that you wish to connect to yourself
const AddUIContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUIComponent)

export default AddUIContainer

