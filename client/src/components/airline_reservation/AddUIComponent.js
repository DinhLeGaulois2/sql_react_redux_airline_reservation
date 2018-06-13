import React from 'react'
import requireAuth from '../requireAuth'
import { Route, Link } from "react-router-dom";
import '../HeaderStyle.css';

import AddBookingComponent from '../../components/airline_reservation/AddBookingComponent'
import AddPassengerComponent from '../../components/airline_reservation/AddPassengerComponent'

class AddUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Link to={`${match.url}/addBooking`}>New Booking</Link>
                <Link to={`${match.url}/addPassenger`}>New Passenger</Link>

                <Route path={`${match.url}/addBooking`} component={AddBookingComponent} />
                <Route path={`${match.url}/addPassenger`} component={AddPassengerComponent} />
            </div>
        )
    }
}

export default requireAuth(AddUIComponent)