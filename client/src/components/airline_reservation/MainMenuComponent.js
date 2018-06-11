import React from 'react'
import { Route, Link } from "react-router-dom";
import requireAuth from '../requireAuth'

import AddUIComponent from '../../components/airline_reservation/AddUIComponent'
import DisplayUIComponent from '../../components/airline_reservation/DisplayUIComponent'

const MainMenuComponent = ({ match }) =>
    <div>
        <ul>
            <li>
                <Link to={`${match.url}/add`}>New Booking</Link>
            </li>
            <li>
                <Link to={`${match.url}/display`}>List Booking</Link>
            </li>
        </ul>

        <Route path={`${match.url}/add`} component={AddUIComponent} />
        <Route path={`${match.url}/add`} component={DisplayUIComponent} />
    </div>

export default requireAuth(MainMenuComponent)