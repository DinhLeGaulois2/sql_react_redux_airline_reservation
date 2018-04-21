import React from 'react'
import PropTypes from 'prop-types'

import cst from '../../constants/airline_reservation/cst'

import AddUIContainer from '../../containers/airline_reservation/AddUIContainer'
import DisplayUIContainer from '../../containers/airline_reservation/DisplayUIContainer'

const MainMenuComponent = ({ menuStatus, doRequest, changeStatus }) =>
    <div>
        <table style={{ 'backgroundColor': 'black', 'width': '100%' }}><tbody><tr>
            <td align="center" style={{ 'padding': '10px' }}>
                <button type="button" className="btn" onClick={e => {
                    e.preventDefault()
                    changeStatus(cst.MENU_ADD, "")
                }}>Add</button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <button type="button" className="btn" onClick={e => {
                    e.preventDefault()
                    changeStatus(cst.MENU_DISPLAY, "")
                }}>Show</button>
            </td>
        </tr></tbody></table>
        {menuStatus === cst.MENU_ADD &&
            <AddUIContainer />
        }
        {menuStatus === cst.MENU_DISPLAY &&
            <DisplayUIContainer />
        }
    </div>

MainMenuComponent.prototype = {
    menuStatus: PropTypes.string,
    changeStatus: PropTypes.func.isRequired
}

export default MainMenuComponent