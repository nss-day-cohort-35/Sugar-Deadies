// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display individual tasks
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditEventForm from "../event/EditEventForm";
import "../event/event.css";
import { Modal, ModalHeader, ModalBody,  } from "reactstrap";



class EventCard extends Component {

	state = {
		modal: false
	};

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	activeUserId = parseInt(sessionStorage.getItem("userId"))

	handleDelete = id => {
		APIManager.delete("events", id)
			.then(() => { this.props.getData() }
			);
	}

	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				&times;
			</button>
		);
		return (
			<>
				<div className="card">
					<div className="card-content">
						<h3>
							Event Name:{this.props.event.eventName}
							<span className="card-eventTitle"></span>
						</h3>

						<p>Event Location:{this.props.event.eventLocation}</p>

						<p>Date: {this.props.event.eventDate}</p>

						<button
							type="button"
							className="delete"
							onClick={() =>
								this.handleDelete(this.props.event.id)
							}
						>
							Delete
						</button>

						<button
							type="button"
							className="edit"
							onClick={() => {
								this.toggle();
							}}
						>
							Edit
						</button>

						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader toggle={this.toggle} close={closeBtn}>
								Edit Event
							</ModalHeader>
							<ModalBody>
								<EditEventForm
									{...this.props}
									eventId={this.props.event.id}
									getData={this.props.getData}
									toggle={this.toggle}
								/>
							</ModalBody>
						</Modal>
					</div>
				</div>
			</>
		);
	}
}

export default EventCard;