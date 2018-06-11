import React from 'react'
import requireAuth from '../requireAuth'
import { Route, Link } from "react-router-dom";

import AddBookingComponent from '../../components/airline_reservation/AddBookingComponent'
import AddPassengerComponent from '../../components/airline_reservation/AddPassengerComponent'

const AddUIComponent = ({ match }) => (
    <div>
        <ul>
            <li>
                <Link to={`${match.url}/addBooking`}>New Booking</Link>
            </li>
            <li>
                <Link to={`${match.url}/addPassenger`}>New Passenger</Link>
            </li>
        </ul>

        <Route path={`${match.url}/addBooking`} component={AddBookingComponent} />
        <Route path={`${match.url}/addPassenger`} component={AddPassengerComponent} />
    </div>
)

export default requireAuth(AddUIComponent)