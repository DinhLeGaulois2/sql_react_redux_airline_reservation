import React from 'react'
import PropTypes from 'prop-types'

import '../../style.scss'

import Modal from '../../common/modal/modal'

import cst from '../../constants/airline_reservation/cst'

const DisplayAPassenger = ({ id, firstName, lastName, phone, email, address, zipcode, state, city, country, onClickDelete }) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <div className="relative">
            <h3 align="center" className="centeredChapterTitle"><b>Client Id</b>: {id}</h3>
            <button type="button" className="btnDelete"  style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                onClickDelete(id)
            }}>X</button>
        </div>
        <p><b>Name</b>: {firstName} {lastName}</p>
        <p><b>Phone</b>: {phone}</p>
        <p><b>Email</b>: {email}</p>
        <p><b>Address</b>: {address}, {city}, {state} {zipcode}, {country}</p>

    </td>

const DisplayPassengerListComponent = ({ passengers, onClickAddPassenger, onClickDelete }) => (
    <div>
        <table align="center" style={{ 'width': '80%' }}><tbody>
            {passengers.map((passenger, index) =>
                <tr key={index}>
                    <DisplayAPassenger
                        key={passenger.id}
                        {...passenger}
                        onClickDelete={onClickDelete}
                    />
                </tr>
            )}
        </tbody></table>
    </div>
)

DisplayAPassenger.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    zipcode: PropTypes.number,
    state: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    onClickDelete: PropTypes.func.isRequired
}

DisplayPassengerListComponent.propTypes = {
    passengers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        zipcode: PropTypes.number,
        state: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string
    })),
    onClickDelete: PropTypes.func.isRequired
}

export default DisplayPassengerListComponent