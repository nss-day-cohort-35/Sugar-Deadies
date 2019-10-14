// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display individual tasks
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditMessageCard from "./EditMessageCard"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class MessageCard extends Component {

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
		APIManager.delete("messages", id)
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
							Enter your message:{this.props.message.messageChat}
							<span className="card-messageTitle"></span>
						</h3>


						<button
							type="button" className="delete-message"
							onClick={() =>
								this.handleDelete(this.props.message.id)
							}
						>
							Delete
						</button>

						<button
							type="button" className="edit-message"
							onClick={() => {
								this.toggle()
							}}
						>
							Edit
						</button>

						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader
								toggle={this.toggle}
								close={closeBtn}>
								Edit Message
							</ModalHeader>
							<ModalBody>
								<EditMessageCard {...this.props} messageId={this.props.message.id} getData={this.props.getData} toggle={this.toggle} />
							</ModalBody>


						</Modal>
						<hr></hr>
					</div>
				</div>
			</>
		);
	}
}

export default MessageCard;