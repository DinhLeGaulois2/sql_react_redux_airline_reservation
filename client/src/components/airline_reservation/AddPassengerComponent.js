import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, reset } from 'redux-form'
import { compose } from 'redux'
import actions from '../../actions/airline_reservation/reservationAction'
import requireAuth from '../../components/requireAuth';

import '../../style.scss'

import { renderInputField } from '../../common/reduxForm/renderField'


const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = '*'
    }
    if (!values.lastName) {
        errors.lastName = '*'
    }
    if (!values.phone) {
        errors.phone = "*"
    }
    if (!values.email) {
        errors.email = "*"
    }
    if (!values.address) {
        errors.address = "*"
    }
    if (!values.zipcode) {
        errors.zipcode = '*'
    }
    if (!values.state) {
        errors.state = '*'
    }
    if (!values.city) {
        errors.city = '*'
    }
    if (!values.country) {
        errors.country = '*'
    }
    return errors
}

class AddPassengerComponent extends React.Component {
    render() {
        const { handleSubmit, invalid, submitting, reset } = this.props

        return (
            <div className="container" style={{ 'backgroundColor': 'white' }}>
                <br />
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
                }}>Add New Passenger</div>
                <p align="center">[<b><i>Fields with (<font color="red">*</font>) are required</i></b>]</p>
                <hr />
                <form onSubmit={handleSubmit(this.props.addPassenger)}>
                    <div>
                        <Field name="firstName" component={renderInputField} placeholder="First Name" /><br />
                        <Field name="lastName" component={renderInputField} placeholder="Last Name" /><br />
                        <Field name="phone" component={renderInputField} placeholder="Phone" /><br />
                        <Field name="email" component={renderInputField} placeholder="Email" /><br />
                        <Field name="address" component={renderInputField} placeholder="Address" />
                        <Field name="zipcode" component={renderInputField} placeholder="Zip Code" />
                        <Field name="state" component={renderInputField} placeholder="State" />
                        <Field name="city" component={renderInputField} placeholder="City" />
                        <Field name="country" component={renderInputField} placeholder="Country" />
                    </div>
                    <br /><br />
                    <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                    </p><br />
                </form>
            </div>
        )
    }
}

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('airlineAddPassengerForm'));

export default compose(
    connect(null, actions),
    reduxForm({
        form: 'airlineAddPassengerForm',
        validate,
        onSubmitSuccess: afterSubmit
    }),
)(requireAuth(AddPassengerComponent))
