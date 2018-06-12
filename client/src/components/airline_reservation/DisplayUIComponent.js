import React from 'react'
import { Route, Link } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';

import DisplayBookingListComponent from '../../components/airline_reservation/DisplayBookingListComponent'
import DisplayPassengerListComponent from '../../components/airline_reservation/DisplayPassengerListComponent'

const DisplayUIComponent = ({ match }) => (
    <div>
        <Link to={`${match.url}/bookingList`}>Bookings List</Link>
        <Link to={`${match.url}/passengerList`}>Passengers List</Link>

        <Route path={`${match.url}/bookingList`} component={DisplayBookingListComponent} />
        <Route path={`${match.url}/passengerList`} component={DisplayPassengerListComponent} />
    </div>
)

export default requireAuth(DisplayUIComponent)