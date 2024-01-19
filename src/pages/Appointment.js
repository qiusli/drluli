import React from 'react';
import {Link} from 'react-router-dom';
import Main from '../layouts/Main';

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            appointmentTime: "",
            appointmentDay: [],
            commentsOrQuestions: "",
            visitType: "",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.history.push('/SubmitSuccess');
        } else {
            alert("Please correct all the fields with errors")
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleRadioChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleCheckboxChange(event) {
        const name = event.target.name;
        const isChecked = event.target.checked;
        const value = event.target.value;
        if (!isChecked) {
            this.setState({
                'appointmentDay': this.state.appointmentDay.filter(function (day) {
                    return day !== value
                })
            });
        } else {
            this.setState(prevState => ({
                'appointmentDay': [...prevState.appointmentDay, value]
            }))
        }
    }

    handleButtonClick(event) {
        const name = event.target.name;
        this.setState({
            'visitType': name
        });
    }

    handleValidation(event) {
        let errors = {};
        let formIsValid = true;

        //firstName
        if (!this.state.firstName) {
            formIsValid = false;
            errors["firstName"] = "field cannot be empty";
        }

        if (this.state.firstName !== "") {
            if (!this.state.firstName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["firstName"] = "only letters are allowed";
            }
        }

        //lastName
        if (!this.state.lastName) {
            formIsValid = false;
            errors["lastName"] = "field cannot be empty";
        }

        if (this.state.lastName !== "") {
            if (!this.state.lastName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["lastName"] = "only letters are allowed";
            }
        }

        //Email
        if (!this.state.emailAddress) {
            formIsValid = false;
            errors["emailAddress"] = "field cannot be empty";
        }

        if (this.state.emailAddress !== "") {
            let lastAtPos = this.state.emailAddress.lastIndexOf('@');
            let lastDotPos = this.state.emailAddress.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 &&
                this.state.emailAddress.indexOf('@@') === -1 &&
                lastDotPos > 2 &&
                (this.state.emailAddress.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["emailAddress"] = "email address is not valid";
            }
        }

        //appointment time
        if (!this.state.appointmentTime) {
            formIsValid = false;
            errors["appointmentTime"] = "Please choose a preferred appointment time";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    render() {
        return (
            <Main
                title="Book Appointment"
                description="book appointment"
            >
                <form onSubmit={this.handleSubmit}>
                    <header>
                        <div className="title">
                            <h2 data-testid="heading">Book Your Next Appointment Online Today!</h2>
                        </div>
                    </header>
                    <div>
                        <p>The first step towards a beautiful, healthy smile is to schedule an appointment.
                            Please complete the appointment
                            request form below. Our scheduling coordinator will contact
                            you to confirm your appointment.
                        </p>
                        <p>Please note: Our appointments are scheduled specifically for each patient.
                            To avoid a cancellation charge we ask that you kindly notify us at least
                            48 hours in advance if you are unable to attend your appointment.
                        </p>
                    </div>
                    <em><i><span id="redEmph">*</span> indicates required fields</i></em>
                    <table>
                        <tbody>
                        <tr>
                            <td>Your First Name <span id="redEmph">*</span></td>
                            <td>
                                <input name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                                <span className="error">{this.state.errors["firstName"]}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Your Last Name <span id="redEmph">*</span></td>
                            <td>
                                <input name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                                <span className="error">{this.state.errors["lastName"]}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Your Email Address <span id="redEmph">*</span></td>
                            <td>
                                <input name="emailAddress" value={this.state.emailAddress} onChange={this.handleInputChange}/>
                                <span className="error">{this.state.errors["emailAddress"]}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Your Phone Number</td>
                            <td><input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td>Best time for appointment <span id="redEmph">*</span></td>
                            <td>
                                <label>
                                    <input type="radio"
                                           id="option1"
                                           name="appointmentTime"
                                           value="Morning"
                                           checked={this.state.appointmentTime === 'Morning'}
                                           onChange={this.handleRadioChange}/>
                                    &nbsp;&nbsp;Morning
                                </label>
                                <label>
                                    <input type="radio"
                                           id="option2"
                                           name="appointmentTime"
                                           value="Afternoon"
                                           checked={this.state.appointmentTime === 'Afternoon'}
                                           onChange={this.handleRadioChange}/>
                                    &nbsp;&nbsp;Afternoon
                                </label>
                                <span className="error">{this.state.errors["appointmentTime"]}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Preferred day of week</td>
                            <td>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Monday"
                                           checked={this.state.appointmentDay.includes('Monday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Monday
                                </label>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Tuesday"
                                           checked={this.state.appointmentDay.includes('Tuesday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Tuesday
                                </label>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Wednesday"
                                           checked={this.state.appointmentDay.includes('Wednesday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Wednesday
                                </label>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Thursday"
                                           checked={this.state.appointmentDay.includes('Thursday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Thursday
                                </label>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Friday"
                                           checked={this.state.appointmentDay.includes('Friday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Friday
                                </label>
                                <label>
                                    <input type="checkbox"
                                           name="appointmentDay"
                                           value="Friday"
                                           checked={this.state.appointmentDay.includes('Friday')}
                                           onChange={this.handleCheckboxChange}/>
                                    &nbsp;&nbsp;Saturday
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Comments or questions</td>
                            <td>
                                <textarea
                                    rows='3'
                                    cols='50'
                                    name="commentsOrQuestions"
                                    value={this.state.commentsOrQuestions}
                                    onChange={this.handleInputChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Type of visit</td>
                            <td>
                                <label>
                                    Book a Virtual Walk-in Consultation
                                </label>
                                <p>See a doctor on your mobile phone through video or phone</p>
                                <button
                                    className={'onlineVisit' === this.state.visitType ? 'focus' : ''}
                                    type='button'
                                    name='onlineVisit'
                                    onClick={this.handleButtonClick}>
                                    Book for Virtual Consultation
                                </button>

                            </td>
                            <td>
                                <label>
                                    Book an In-Person Walk-in Visit
                                </label>
                                <p>Book with a walk-in physician for an in-person visit.</p>
                                <button
                                    className={'inPersonVisit' === this.state.visitType ? 'focus' : ''}
                                    type='button'
                                    name='inPersonVisit'
                                    onClick={this.handleButtonClick}>
                                    Book for In-Person Consultation
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <label>
                        <input type="submit" value="submit"/>
                    </label>
                </form>
            </Main>
        );
    }
}

export default Appointment;
