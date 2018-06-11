import React from 'react'
import { connect } from 'react-redux'

import actions from '../../actions/airline_reservation/reservationAction'
import AddPassengerComponent from '../../components/airline_reservation/AddPassengerComponent'

const mapDispatchToProps = (dispatch) => ({
    onClickAddPassenger: (data) => { dispatch(actions.addPassenger(data)) },
})

// You have to connect() to any reducers that you wish to connect to yourself
const AddPassengerContainer = connect(
    null,
    mapDispatchToProps
)(AddPassengerComponent)

export default AddPassengerContainer

