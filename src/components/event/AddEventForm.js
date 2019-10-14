// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../event/event.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas fa-plus-circle fa-1x } from '@fortawesome/free-solid-svg-icons'

class AddEventForm extends Component {


    //set the initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        userId: "",
        id: [],
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addEvent = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.eventName === "" || this.state.eventLocation === "") {
            window.alert("Please input a event");
        } else {
            this.setState({ loadingStatus: true });
            const addedEvent = {
                userId: this.activeUserId,
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                eventLocation: this.state.eventLocation,

            };

            APIManager.post("events", addedEvent)
                .then(() => { this.props.getData() }
                );
        };
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>
                {" "}
                <Button className="addEvent" onClick={this.toggle}>
                    Add Event</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Create Event
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="eventName">
                                        Event Name:
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="eventName"
                                        value={this.state.eventName}
                                    />

                                    <label htmlFor="event">Event Date:</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="eventDate"
                                        value={this.state.eventDate}
                                    />

                                    <label htmlFor="event">Address:</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="eventLocation"
                                        value={this.state.eventLocation}
                                    />
                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
className="add"
                            onClick={this.addEvent}
                        >
                            Add
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default AddEventForm;
