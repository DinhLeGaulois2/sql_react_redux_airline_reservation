import React from 'react'
import { connect } from 'react-redux'

import UpdateBookingComponent from '../components/airline_reservation/UpdateBookingComponent'

const mapStateToProps = (state) => ({
    data: state.test.data
})

const mapDispatchToProps = (dispatch) => ({
    doRequest: () => { dispatch(testAction.testAPIRequest()) },
})

// You have to connect() to any reducers that you wish to connect to yourself
const UpdateBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateBookingComponent)

export default UpdateBookingContainer

