import React from 'react'
import { Route, NavLink } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';

import DisplayBookingListComponent from '../../components/airline_reservation/DisplayBookingListComponent'
import DisplayPassengerListComponent from '../../components/airline_reservation/DisplayPassengerListComponent'

class DisplayUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <div style={{ "backgroundColor": "black" }}>
                    <br />
                    <p align="center">
                        <NavLink to={`${match.url}/bookingList`} className="navLink" strict activeStyle={{ color: 'blue', fontSize: 'bold' }}>Bookings List</NavLink>
                        <NavLink to={`${match.url}/passengerList`} className="navLink" strict activeStyle={{ color: 'blue', fontSize: 'bold' }}>Passengers List</NavLink>
                    </p>
                    <br />
                </div>
                <Route path={`${match.url}/bookingList`} component={DisplayBookingListComponent} />
                <Route path={`${match.url}/passengerList`} component={DisplayPassengerListComponent} />
            </div>
        )
    }
}

export default requireAuth(DisplayUIComponent)