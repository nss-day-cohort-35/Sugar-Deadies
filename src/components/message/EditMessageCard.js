// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";
import "../message/message.css";

class EditMessageForm extends Component {
	//set the initial state
	state = {
		chatMessage: "",
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingMessage = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedMessage = {
			id: parseInt(this.props.messageId),
			userName: this.props.name,
			chatMessage: this.state.chatMessage,
			userId: this.state.activeUser
		};
		console.log(this.props.messageId)
		console.log(editedMessage)
		APIManager.update("messages", editedMessage)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("messages", this.props.messageId)
			.then(
				message => {
					this.setState({
						chatMessage: message.chatMessage,
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
									id="chatMessage"
									value={this.state.chatMessage}
								/>
								<label htmlFor="chatMessage">
									Message Chat
								</label>
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
							this.updateExistingMessage(evt);
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


export default EditMessageForm;
