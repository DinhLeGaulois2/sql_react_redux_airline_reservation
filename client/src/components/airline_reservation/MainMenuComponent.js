import React from 'react'
import { Route, Link } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';
import '../../style.scss'

import AddUIComponent from '../../components/airline_reservation/AddUIComponent'
import DisplayUIComponent from '../../components/airline_reservation/DisplayUIComponent'

const MainMenuComponent = ({ match }) =>
    <div>
        <Link to={`${match.url}/add`}>New Booking</Link>
        <Link to={`${match.url}/display`} className='menuButton'>List Booking</Link>

        <Route path={`${match.url}/add`} component={AddUIComponent} />
        <Route path={`${match.url}/display`} component={DisplayUIComponent} />
    </div>

export default requireAuth(MainMenuComponent)