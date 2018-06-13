import React from 'react'
import { Route, NavLink } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';
import '../../style.scss'

import AddUIComponent from '../../components/airline_reservation/AddUIComponent'
import DisplayUIComponent from '../../components/airline_reservation/DisplayUIComponent'

const MainMenuComponent = ({ match }) =>
    <div>
        <div style={{ "backgroundColor": "#1b5c71", "padding": "5px" }}>
            <NavLink to={`${match.url}/add`} className="navLink" strict activeStyle={{ color: 'blue' }}>New Booking</NavLink>
            <NavLink to={`${match.url}/display`} className="navLink" strict activeStyle={{ color: 'blue' }}>List Booking</NavLink>
        </div>

        <Route path={`${match.url}/add`} component={AddUIComponent} />
        <Route path={`${match.url}/display`} component={DisplayUIComponent} />
    </div>

export default requireAuth(MainMenuComponent)