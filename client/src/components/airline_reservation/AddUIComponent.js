import React from 'react'
import requireAuth from '../requireAuth'
import { Route, NavLink } from "react-router-dom";
import '../HeaderStyle.css';

import AddBookingComponent from './AddBookingComponent'
import AddPassengerComponent from './AddPassengerComponent'

class AddUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <div style={{ "backgroundColor": "black" }}>
                <br/>
                    <p align="center">
                        <NavLink to={`${match.url}/addBooking`} className="navLink" strict activeStyle={{ color: 'blue' }}>New Booking</NavLink>
                        <NavLink to={`${match.url}/addPassenger`} className="navLink" strict activeStyle={{ color: 'blue' }}>New Passenger</NavLink>
                    </p>
                    <br/>
                </div>
                <Route path={`${match.url}/addBooking`} component={AddBookingComponent} />
                <Route path={`${match.url}/addPassenger`} component={AddPassengerComponent} />
            </div>
        )
    }
}

export default requireAuth(AddUIComponent)