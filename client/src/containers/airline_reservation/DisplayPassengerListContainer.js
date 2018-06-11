import React from 'react'
import { connect } from 'react-redux'

import DisplayPassengerListComponent from '../../components/airline_reservation/DisplayPassengerListComponent'
import actions from '../../actions/airline_reservation/reservationAction'

const mapStateToProps = (state) => ({
    passengers: state.booking.data
})

const mapDispatchToProps = (dispatch) => ({
    onClickDelete: (pId) => { dispatch(actions.deletePassengerById(pId)) }
})

// You have to connect() to any reducers that you wish to connect to yourself
const DisplayPassengerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayPassengerListComponent)

export default DisplayPassengerListContainer

