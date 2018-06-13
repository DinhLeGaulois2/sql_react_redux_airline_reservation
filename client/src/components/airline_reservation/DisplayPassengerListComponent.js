import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/airline_reservation/reservationAction'
import requireAuth from '../../components/requireAuth';

import '../../style.scss'

const DisplayAPassenger = (passenger) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <div className="relative">
            <h3 align="center" className="centeredChapterTitle"><b>Client Id</b>: {passenger.id}</h3>
            <button type="button" className="btnDelete" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                this.props.deleteBookingById(passenger.id)
            }}>X</button>
        </div>
        <p><b>Name</b>: {passenger.firstName} {passenger.lastName}</p>
        <p><b>Phone</b>: {passenger.phone}</p>
        <p><b>Email</b>: {passenger.email}</p>
        <p><b>Address</b>: {passenger.address}, {passenger.city}, {passenger.state} {passenger.zipcode}, {passenger.country}</p>

    </td>

class DisplayPassengerListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.setPassengers()
    }

    render() {
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
                                    deleteBookingById={this.props.deleteBookingById}
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