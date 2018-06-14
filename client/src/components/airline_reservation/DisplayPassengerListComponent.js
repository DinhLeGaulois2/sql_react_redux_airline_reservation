import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/airline_reservation/reservationAction'
import requireAuth from '../../components/requireAuth';

import '../../style.scss'

// class DisplayAPassenger extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     rendre() {
//         const { passenger, deletePassengerById } = this.props
//         return (
//             <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
//                 <div className="relative">
//                     <h3 align="center" className="centeredChapterTitle"><b>Client Id</b>: {passenger.id}</h3>
//                     <button type="button" className="btnDelete" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
//                         e.preventDefault()
//                         deletePassengerById(passenger.id)
//                     }}>X</button>
//                 </div>
//                 <p><b>Name</b>: {passenger.firstName} {passenger.lastName}</p>
//                 <p><b>Phone</b>: {passenger.phone}</p>
//                 <p><b>Email</b>: {passenger.email}</p>
//                 <p><b>Address</b>: {passenger.address}, {passenger.city}, {passenger.state} {passenger.zipcode}, {passenger.country}</p>
//             </td>
//         )
//     }
// }

const DisplayAPassenger = ({ id, firstName, lastName, phone, email, address, zipcode, state, city, country, deletePassengerById }) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <div className="relative">
            <h3 align="center" className="centeredChapterTitle"><b>Client Id</b>: {id}</h3>
            <button type="button" className="btnDelete" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                deletePassengerById(id)
            }}>X</button>
        </div>
        <p><b>Name</b>: {firstName} {lastName}</p>
        <p><b>Phone</b>: {phone}</p>
        <p><b>Email</b>: {email}</p>
        <p><b>Address</b>: {address}, {city}, {state} {zipcode}, {country}</p>
    </td>

class DisplayPassengerListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.setPassengers()
    }

    render() {
        const { deletePassengerById } = this.props
        return (
            <div>
                <br />
                {this.props.passengers.length > 0 &&
                    <table align="center" style={{ 'width': '80%' }}><tbody>
                        {this.props.passengers.map((passenger, index) =>
                            <tr key={index}>
                                <DisplayAPassenger
                                    key={passenger.id}
                                    {...passenger}
                                    deletePassengerById={deletePassengerById}
                                />
                            </tr>
                        )}
                    </tbody></table>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    passengers: state.passenger.data
})

export default connect(
    mapStateToProps,
    actions
)(requireAuth(DisplayPassengerListComponent))