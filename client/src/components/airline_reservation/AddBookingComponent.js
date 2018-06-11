import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, reset, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import { renderInputField, renderTextareaField } from '../../common/reduxForm/renderField'

import '../../style.scss'

const validate = values => {
    const errors = {}

    if (!values.paymentMethodIndex) {
        errors.paymentMethodIndex = "Required"
    }
    if (!values.ticketTypeIndex) {
        errors.ticketTypeIndex = "Required"
    }
    if (!values.classSeatCapacitiesIndex) {
        errors.classSeatCapacitiesIndex = "Required"
    }
    if (!values.passengerIndex) {
        errors.passengerIndex = "Required"
    }
    if (!values.flightIndex) {
        errors.flightIndex = "Required"
    }
    return errors
}

let AddBookingComponent = ({ data, handleSubmit, invalid, submitting, reset, onClickAddBooking,
    flightIndex, classSeatCapacitiesCheck, ticketTypeCheck, paymentMethodCheck, selectAPassengerIndex }) => (
        <div>
            <div className="container" style={{ 'backgroundColor': 'white' }}>
                <div align="center" className="mainTitle" style={{
                    'backgroundColor': 'black',
                    'color': 'cyan',
                    'width': '100%',
                    'borderRadius': "30px",
                    'padding': '10px',
                    'fontSize': '300%',
                    'fontWeight': 'bold',
                    'textAlign': 'center',
                    'margin': '20px 0px'
                }}>Add New Booking</div>
            </div>
            <br />
            <form onSubmit={handleSubmit(onClickAddBooking)}>
                <div>
                    {!selectAPassengerIndex &&
                        <div>
                            <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}><font color="blue">Please, Select A Passenger</font></h3>
                            <table align="center" style={{ 'width': '80%' }}><tbody>
                                {data[0].passengers.map((p, index) =>
                                    <tr key={index}>
                                        <td>
                                            <Field name="passengerIndex" component="input" type="radio" value={index} />
                                        </td>
                                        <td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px', 'borderRadius': '20px' }}>
                                            <b>Name</b>: {p.firstName} {p.lastName}<br />
                                            <b>Phone</b>: {p.phone}<br />
                                            <b>Email</b>: {p.email}<br />
                                            <b>Address</b>: {p.address}, {p.city}, {p.state} {p.zipcode}, {p.country}<br />
                                        </td>
                                    </tr>
                                )}
                            </tbody></table>
                        </div>
                    }
                    {selectAPassengerIndex &&
                        <div>
                            {!flightIndex &&
                                <div>
                                    <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}><b>Passenger</b>: {data[0].passengers[selectAPassengerIndex].firstName} {data[0].passengers[selectAPassengerIndex].lastName}</h3>
                                    <table align="center" style={{ 'width': '80%', 'backgroundColor': 'white', 'color': 'black' }}><tbody>
                                        {data[0].flight.map((fl, index) =>
                                            <tr key={index}><td style={{ 'padding': '10px', 'border': 'solide' }}><Field name="flightIndex" component="input" type="radio" value={index} /> <b>Flight</b>: {fl.flightNumber}
                                                <ul>
                                                    <li><b>Destination</b>: {fl.destination}</li>
                                                    <li><b>Departure</b>: {fl.departureTime}</li>
                                                    <li><b>Arrival</b>: {fl.arrivalTime}</li>
                                                    <li><b>Aircraft</b>: {fl.airplane.aircraftType}</li>
                                                    <li><b>Seat Capacities</b>:
                                                <ul>
                                                            <li>Class <b>{fl.classSeatCapacities[0].travelClass.travelClassCode}</b>:
                                                            {fl.classSeatCapacities[0].seatCapacity}
                                                            </li>
                                                            <li>Class <b>{fl.classSeatCapacities[1].travelClass.travelClassCode}</b>:
                                                            {fl.classSeatCapacities[1].seatCapacity}
                                                            </li>
                                                            <li>Class <b>{fl.classSeatCapacities[2].travelClass.travelClassCode}</b>:
                                                             {fl.classSeatCapacities[2].seatCapacity}
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </td>
                                            </tr>
                                        )}
                                    </tbody></table>
                                </div>
                            }
                            {flightIndex &&
                                <div>
                                    <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}><b>Passenger</b>: {data[0].passengers[selectAPassengerIndex].firstName} {data[0].passengers[selectAPassengerIndex].lastName}</h3>
                                    <table align="center" style={{ 'width': '80%' }}><tbody><tr><td>
                                        <table align="center"><tbody><tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px', 'borderRadius': '20px' }}>
                                            <b>Flight Number</b>: {data[0].flight[flightIndex].flightNumber}<br />
                                            <b>Destination</b>: {data[0].flight[flightIndex].destination}<br />
                                            <b>Departure</b>: {data[0].flight[flightIndex].departureTime}<br />
                                            <b>Arrival</b>: {data[0].flight[flightIndex].arrivalTime}<br />
                                            <b>Aircraft</b>: {data[0].flight[flightIndex].airplane.aircraftType}
                                        </td></tr>
                                        </tbody></table>
                                        <br />
                                        {!classSeatCapacitiesCheck &&
                                            <table align="center" style={{ 'width': '80%' }}><tbody><tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}><b>Travel Class</b></td></tr>
                                                <tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}>
                                                    &nbsp;&nbsp;&nbsp;<Field name="classSeatCapacitiesIndex" component="input" type="radio" value="0" /> {data[0].flight[flightIndex].classSeatCapacities[0].travelClass.travelClassCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="classSeatCapacitiesIndex" component="input" type="radio" value="1" /> {data[0].flight[flightIndex].classSeatCapacities[1].travelClass.travelClassCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="classSeatCapacitiesIndex" component="input" type="radio" value="2" /> {data[0].flight[flightIndex].classSeatCapacities[2].travelClass.travelClassCode}
                                                </td></tr>
                                            </tbody></table>
                                        }
                                        {classSeatCapacitiesCheck && <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}>Travel Class Selected: <b>{data[0].flight[flightIndex].classSeatCapacities[classSeatCapacitiesCheck].travelClass.travelClassCode}</b></h3>}
                                        <br />
                                        {!ticketTypeCheck &&
                                            <table align="center" style={{ 'width': '80%' }}><tbody><tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}><b>Ticket Type</b></td></tr>
                                                <tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}>
                                                    &nbsp;&nbsp;&nbsp;<Field name="ticketTypeIndex" component="input" type="radio" value="0" /> {data[0].ticketType[0].ticketTypeCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="ticketTypeIndex" component="input" type="radio" value="1" /> {data[0].ticketType[1].ticketTypeCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="ticketTypeIndex" component="input" type="radio" value="2" /> {data[0].ticketType[2].ticketTypeCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="ticketTypeIndex" component="input" type="radio" value="3" /> {data[0].ticketType[3].ticketTypeCode}
                                                </td></tr>
                                            </tbody></table>
                                        }
                                        {ticketTypeCheck && <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}>Ticket Type Selected: <b>{data[0].ticketType[ticketTypeCheck].ticketTypeCode}</b></h3>}
                                        <br />
                                        {!paymentMethodCheck &&
                                            < table align="center" style={{ 'width': '80%' }}> <tbody><tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}><b>Payment Method</b></td></tr>
                                                <tr><td style={{ 'backgroundColor': 'white', 'color': 'black', 'padding': '20px' }}>
                                                    &nbsp;&nbsp;&nbsp;<Field name="paymentMethodIndex" component="input" type="radio" value="0" /> {data[0].paymentMethod[0].paymentMethodCode}
                                                    <br />&nbsp;&nbsp;&nbsp;<Field name="paymentMethodIndex" component="input" type="radio" value="1" /> {data[0].paymentMethod[1].paymentMethodCode}
                                                </td></tr>
                                            </tbody></table>
                                        }
                                        {paymentMethodCheck && <h3 align="center" style={{ 'backgroundColor': 'white', 'color': 'black' }}>Payment Method Selected: <b>{data[0].paymentMethod[paymentMethodCheck].paymentMethodCode}</b></h3>}
                                    </td></tr>
                                    </tbody></table>
                                </div>
                            }
                        </div>
                    }
                </div>
                <br /> <hr />
                <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                </p><br/>
            </form>
        </div>
    )

AddBookingComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        flight: PropTypes.arrayOf(PropTypes.shape({
            flightNumber: PropTypes.string,
            destination: PropTypes.string,
            departureTime: PropTypes.date,
            arrivalTime: PropTypes.date,
            airplane: PropTypes.shape({
                aircraftType: PropTypes.string
            }),
            classSeatCapacities: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                seatCapacity: PropTypes.number,
                travelClassId: PropTypes.number,
                price: PropTypes.number,
                travelClass: PropTypes.shape({
                    id: PropTypes.number,
                    travelClassCode: PropTypes.string
                })
            }))
        })),
        bookingStatus: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            bookingStatusCode: PropTypes.string
        })),
        ticketType: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            ticketTypeCode: PropTypes.string
        })),
        paymentMethod: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            paymentMethodCode: PropTypes.string
        })),
        paymentStatus: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            paymentStatusCode: PropTypes.string
        })),
    })),
    onClickAddBooking: PropTypes.func.isRequired
}

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('airlineAddBookingForm'));

AddBookingComponent = reduxForm({
    form: 'airlineAddBookingForm',
    validate,
    onSubmitSuccess: afterSubmit
})(AddBookingComponent)

// Decorate with connect to read form values
const selector = formValueSelector('airlineAddBookingForm') // <-- same as form name
AddBookingComponent = connect(
    state => {
        const flightIndex = selector(state, 'flightIndex');
        const classSeatCapacitiesCheck = selector(state, 'classSeatCapacitiesIndex');
        const ticketTypeCheck = selector(state, 'ticketTypeIndex');
        const paymentMethodCheck = selector(state, 'paymentMethodIndex');

        const selectAPassengerIndex = selector(state, 'passengerIndex')
        return { flightIndex, classSeatCapacitiesCheck, ticketTypeCheck, paymentMethodCheck, selectAPassengerIndex }
    }
)(AddBookingComponent)


AddBookingComponent = connect(
    state => ({
        initialValues: {
            flightNumber: state.booking.data[0].flight[0].flightNumber,
            destination: state.booking.data[0].flight[0].destination
        }
    })
)(AddBookingComponent)

export default AddBookingComponent
