import React from 'react'
import requireAuth from '../requireAuth'
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import actions from '../../actions/airline_reservation/reservationAction'
import cst from '../../constants/airline_reservation/cst'
import '../HeaderStyle.css';

import AddBookingComponent from '../../components/airline_reservation/AddBookingComponent'
import AddPassengerComponent from '../../components/airline_reservation/AddPassengerComponent'

class AddUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Link to={`${match.url}/addBooking`} onClick={this.props.setStatus("", cst.ADD_BOOKING)}>New Booking</Link>
                <Link to={`${match.url}/addPassenger`} onClick={this.props.setStatus("", cst.ADD_PASSENGER)}>New Passenger</Link>

                <Route path={`${match.url}/addBooking`} component={AddBookingComponent} />
                <Route path={`${match.url}/addPassenger`} component={AddPassengerComponent} />
            </div>
        )
    }
}

export default connect(null, actions)(requireAuth(AddUIComponent))