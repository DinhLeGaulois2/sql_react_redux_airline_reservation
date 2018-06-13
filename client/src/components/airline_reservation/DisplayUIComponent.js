import React from 'react'
import { Route, Link } from "react-router-dom";
import requireAuth from '../requireAuth'
import { connect } from 'react-redux'
import actions from '../../actions/airline_reservation/reservationAction'
import '../HeaderStyle.css';

import DisplayBookingListComponent from '../../components/airline_reservation/DisplayBookingListComponent'
import DisplayPassengerListComponent from '../../components/airline_reservation/DisplayPassengerListComponent'

class DisplayUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Link to={`${match.url}/bookingList`} onClick={this.props.setBookings()}>Bookings List</Link>
                <Link to={`${match.url}/passengerList`} onClick={this.props.setPassengers()}>Passengers List</Link>

                <Route path={`${match.url}/bookingList`} component={DisplayBookingListComponent} />
                <Route path={`${match.url}/passengerList`} component={DisplayPassengerListComponent} />
            </div>
        )
    }
}

export default connect(null, actions)(requireAuth(DisplayUIComponent))