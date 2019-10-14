// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../message/message.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas fa-plus-circle fa-1x } from '@fortawesome/free-solid-svg-icons'

class AddMessageForm extends Component {


    //set the initial state
    state = {
        chatMessage: "",
        userId: "",
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

    addMessage = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.chatMessage === "" ) {
            window.alert("Please input a message");
        } else {
            this.setState({ loadingStatus: true });
            const addedMessage = {
                chatMessage: this.state.chatMessage,
                userId: this.activeUserId
            };

            APIManager.post("messages", addedMessage)
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
				<Button
					className="addMessage"
					color="success"
					onClick={this.toggle}
				>
					Add New Message
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle} close={closeBtn}>
						Create Your Message
					</ModalHeader>
					<ModalBody>
						<form>
							<fieldset>
								<div className="formgrid">
									<label htmlFor="chatMessage">
										Message:
									</label>
									<input
										type="text"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="chatMessage"
										value={this.state.chatMessage}
									/>
								</div>
								<div className="alignRight"></div>
							</fieldset>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button className="add" onClick={this.addMessage}>
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

export default AddMessageForm;
