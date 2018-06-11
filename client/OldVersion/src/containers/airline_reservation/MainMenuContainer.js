import React from 'react'
import { connect } from 'react-redux'

import MainMenuComponent from '../../components/airline_reservation/MainMenuComponent'
import actions from '../../actions/airline_reservation/reservationAction'

const mapStateToProps = (state) => ({
    menuStatus: state.booking.menuStatus
})

const mapDispatchToProps = (dispatch) => ({
    changeStatus: (p1, p2) => { dispatch(actions.setStatus(p1, p2)) }
})

// You have to connect() to any reducers that you wish to connect to yourself
const MainMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenuComponent)

export default MainMenuContainer

