import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, reset, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'

import cst from '../../constants/airline_reservation/cst'

import { renderInputField, renderTextareaField } from '../../common/reduxForm/renderField'


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

let AddPassengerComponent = ({ handleSubmit, invalid, submitting, reset, onClickAddPassenger }) => (
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
        }}>Add New Passenger</div>
        <p align="center">[<b><i>Fields with (<font color="red">*</font>) are required</i></b>]</p>
        <hr/>
        <form onSubmit={handleSubmit(onClickAddPassenger)}>
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
            <p align="center"><button type="submit" className="btnSubmit" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btnSubmit" disabled={submitting} onClick={reset}>Clear Values</button>
            </p><br/>
        </form>
    </div>
)

AddPassengerComponent.propTypes = {
    onClickAddPassenger: PropTypes.func.isRequired
};

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('airlineAddPassengerForm'));

AddPassengerComponent = reduxForm({
    form: 'airlineAddPassengerForm',
    validate,
    onSubmitSuccess: afterSubmit
})(AddPassengerComponent)

export default AddPassengerComponent
