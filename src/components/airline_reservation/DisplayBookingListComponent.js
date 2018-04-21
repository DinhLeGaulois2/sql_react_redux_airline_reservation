import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../common/modal/modal'

import cst from '../../constants/airline_reservation/cst'

const DisplayABooking = ({ id, bookingDate, passenger, travelClass, flight, bookingStatus, ticketType, payments, onClickDelete }) =>
    <td style={{ 'backgroundColor': 'black', 'color': 'cyan', 'padding': '10px', 'margin': '5px', 'borderStyle': 'solid', 'borderColor': 'gray' }}>
        <p><b>Booking Id</b>: {id}</p>
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
        <hr />
        <p align="center"><button type="button" style={{ 'backgroundColor': 'white', 'color': 'blue' }} onClick={e => {
                e.preventDefault()
                onClickDelete(id)
            }}>Delete</button>
        </p>
    </td >

const DisplayBookingListComponent = ({ bookings, onClickNewBooking, onClickDelete }) => (
    <div>
        <div>
            <table align="center"><tbody>
                {bookings.map((booking, index) =>
                    <tr key={index}>
                        <DisplayABooking
                            key={booking.id}
                            {...booking}
                            onClickDelete={onClickDelete}
                        />
                    </tr>
                )}
            </tbody></table>
        </div>
    </div>
)

//--------------------------------------------
const airplane = {
    aircrafType: PropTypes.string
}

const flightShape = {
    flightNumber: PropTypes.string,
    destination: PropTypes.string,
    departureTime: PropTypes.date,
    arrivalTime: PropTypes.date,
    airplane: PropTypes.shape(airplane)
}
//----------------------------------------------
const bookingStatusShape = {
    bookingStatusCode: PropTypes.string
}
//----------------------------------------------
const ticketTypeShape = {
    ticketTypeCode: PropTypes.string
}
//----------------------------------------------
const aPassengerShape = {
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
}
//----------------------------------------------
DisplayABooking.propTypes = {
    id: PropTypes.number,
    bookingDate: PropTypes.string,
    passenger: PropTypes.shape(aPassengerShape),
    travelClass: PropTypes.shape({
        travelClassCode: PropTypes.string
    }),
    flight: PropTypes.shape(flightShape),
    bookingStatus: PropTypes.shape(bookingStatusShape),
    ticketType: PropTypes.shape(ticketTypeShape),
    payments: PropTypes.arrayOf(PropTypes.shape({
        paymentAmount: PropTypes.number,
        paymentStatus: PropTypes.shape({
            paymentStatusCode: PropTypes.string
        }),
        paymentMethod: PropTypes.shape({
            paymentMethodCode: PropTypes.string
        })
    })), 
    onClickDelete: PropTypes.func.isRequired
}

DisplayBookingListComponent.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        bookingDate: PropTypes.date,
        passenger: PropTypes.shape(aPassengerShape),
        travelClass: PropTypes.shape({
            travelClassCode: PropTypes.string
        }),
        flight: PropTypes.shape(flightShape),
        bookingStatus: PropTypes.shape(bookingStatusShape),
        ticketType: PropTypes.shape(ticketTypeShape),
        payments: PropTypes.arrayOf(PropTypes.shape({
            paymentAmount: PropTypes.number,
            paymentStatus: PropTypes.shape({
                paymentStatusCode: PropTypes.string
            }),
            paymentMethod: PropTypes.shape({
                paymentMethodCode: PropTypes.string
            })
        }))
    })),
    onClickDelete: PropTypes.func.isRequired
}
//--------------------------------------------

export default DisplayBookingListComponent