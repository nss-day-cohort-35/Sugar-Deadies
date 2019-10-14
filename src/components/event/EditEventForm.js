// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";
import "../event/event.css";

class EditEventForm extends Component {
	//set the initial state
	state = {
		eventName: "",
		eventDate: "",
		eventLocation: "",
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingEvent = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedEvent = {
			id: parseInt(this.props.eventId),
			eventName: this.state.eventName,
			eventDate: this.state.eventDate,
			eventLocation: this.state.eventLocation,
			userId: this.state.activeUser
		};
		console.log(editedEvent)
		APIManager.update("events", editedEvent)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("events", this.props.eventId)
			.then(
				event => {
					this.setState({
						eventName: event.eventName,
                        eventDate: event.eventDate,
                        eventLocation: event.eventLocation,
						loadingStatus: false,
					});
				});
	};

	render() {
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="eventName"
									value={this.state.eventName}
								/>
								<label htmlFor="eventName">Event Name</label>

								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="eventDate"
									value={this.state.eventDate}
								/>
								<label htmlFor="eventDate">Date</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="eventLocation"
									value={this.state.eventLocation}
								/>
								<label htmlFor="eventlocation">Address</label>
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingEvent(evt);
							this.props.toggle();
						}}
						className="btn btn-primary"
					>
						Submit
					</Button>
					<Button className="cancel" onClick={this.props.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</>
		);
	}
}


export default EditEventForm;
