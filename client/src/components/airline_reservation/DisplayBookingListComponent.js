import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions/airline_reservation/reservationAction'
import '../../style.scss'

const DisplayABooking = (booking) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <div className="relative">
            <h3 align="center" className="centeredChapterTitle"><b>Booking Id</b>: {booking.id}</h3>
            <button type="button" className="btnDelete" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                this.props.onClickDelete(booking.id)
            }}>X</button>
        </div>
        <p><b>Booking Date</b>: {booking.bookingDate}</p>

        <table style={{ 'width': '100%' }}><tbody>
            <tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px', 'borderRadius': '20px' }}>
                <b>Client Id</b>: {booking.passenger.id}<br />
                <b>Name</b>: {booking.passenger.firstName} {booking.passenger.lastName}<br />
                <b>Phone</b>: {booking.passenger.phone}<br />
                <b>Email</b>: {booking.passenger.email}<br />
                <b>Address</b>: {booking.passenger.address}, {booking.passenger.city}, {booking.passenger.state} {booking.passenger.zipcode}, {booking.passenger.country}
            </td></tr>
        </tbody></table>
        <br />
        <p><b>Travel Class</b>: {booking.travelClass.travelClassCode}</p>
        <p><b>Flight</b>:</p>
        <ul>
            <li><b>Number</b>: {booking.flight.flightNumber}</li>
            <li><b>Destination</b>: {booking.destination}</li>
            <li><b>Departure</b>: {booking.flight.departureTime}</li>
            <li><b>Arrival</b>: {booking.flight.arrivalTime}</li>
            <li><b>Aircraft</b>: {booking.flight.airplane.aircraftType}</li>
        </ul>
        <p><b>Booking Status</b>: {booking.bookingStatus.bookingStatusCode}</p>
        <p><b>Ticket Type</b>: {booking.ticketType.ticketTypeCode}</p>
        <p><b>Payment</b>: </p>
        <ul>
            <li><b>Amount</b>: {booking.payments[0].paymentAmount}</li>
            <li><b>Status</b>: {booking.payments[0].paymentStatus.paymentStatusCode}</li>
            <li><b>Method</b>: {booking.payments[0].paymentMethod.paymentMethodCode}</li>
        </ul>
    </td >

class DisplayBookingListComponent extends Component {
    render() {
        return (
            <div>
                {this.props.bookings.length > 0 &&
            <table align="center"><tbody>
                {this.props.bookings.map((booking, index) =>
                    <tr key={index}>
                        <DisplayABooking
                            key={booking.id}
                            {...booking}
                            onClickDelete={this.props.onClickDelete}
                        />
                    </tr>
                )}
            </tbody></table>
        }
        {this.props.bookings.length === 0 &&
            <h1>No Booking to Show!</h1>
        }
            </div>
        )
    }
}

//KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
const showState = (state) => {
    //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    console.log("DisplayBookingListComponent, state: " + JSON.stringify(state.booking.data, null, 5))
    return state.booking.data
}

const mapStateToProps = (state) => ({
    bookings: showState(state)
})

export default connect(mapStateToProps, actions)(DisplayBookingListComponent)