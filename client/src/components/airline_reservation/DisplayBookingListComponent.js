import React, { Component } from 'react'
import { connect } from 'react-redux'
import requireAuth from '../../components/requireAuth';

import actions from '../../actions/airline_reservation/reservationAction'
import '../../style.scss'

const DisplayABooking = ({ id, bookingDate, passenger, travelClass, flight, bookingStatus, ticketType, payments, deleteBookingById }) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <br />
        <div className="relative">
            <h3 align="center" className="centeredChapterTitle"><b>Booking Id</b>: {id}</h3>
            <button type="button" className="btnDelete" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                deleteBookingById(id)
            }}>X</button>
        </div>
        <p><b>Booking Date</b>: {bookingDate}</p>

        <table style={{ 'width': '100%' }}><tbody>
            <tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px', 'borderRadius': '20px' }}>
                <b>Client Id</b>: {passenger.id}<br />
                <b>Name</b>: {passenger.firstName} {passenger.lastName}<br />
                <b>Phone</b>: {passenger.phone}<br />
                <b>Email</b>: {passenger.email}<br />
                <b>Address</b>: {passenger.address}, {passenger.city}, {passenger.state} {passenger.zipcode}, {passenger.country}
            </td></tr>
        </tbody></table>
        <br />
        <p><b>Travel Class</b>: {travelClass.travelClassCode}</p>
        <p><b>Flight</b>:</p>
        <ul>
            <li><b>Number</b>: {flight.flightNumber}</li>
            <li><b>Destination</b>: {flight.destination}</li>
            <li><b>Departure</b>: {flight.departureTime}</li>
            <li><b>Arrival</b>: {flight.arrivalTime}</li>
            <li><b>Aircraft</b>: {flight.airplane.aircraftType}</li>
        </ul>
        <p><b>Booking Status</b>: {bookingStatus.bookingStatusCode}</p>
        <p><b>Ticket Type</b>: {ticketType.ticketTypeCode}</p>
        <p><b>Payment</b>: </p>
        <ul>
            <li><b>Amount</b>: {payments[0].paymentAmount}</li>
            <li><b>Status</b>: {payments[0].paymentStatus.paymentStatusCode}</li>
            <li><b>Method</b>: {payments[0].paymentMethod.paymentMethodCode}</li>
        </ul>
    </td >

class DisplayBookingListComponent extends Component {
    constructor(props) {
        super(props)
        this.props.setBookings()
    }

    render() {
        const { deleteBookingById } = this.props
        
        return (
            <div>
                {this.props.bookings.length > 0 &&
                    <table align="center"><tbody>
                        {this.props.bookings.map((booking, index) =>
                            <tr key={index}>
                                <DisplayABooking
                                    key={booking.id}
                                    {...booking}
                                    deleteBookingById={deleteBookingById}
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
    bookings: state.booking.data
})

export default connect(mapStateToProps, actions)(requireAuth(DisplayBookingListComponent))