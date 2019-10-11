// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold add task form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./taskForm.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas fa-plus-circle fa-1x } from '@fortawesome/free-solid-svg-icons'

class AddTaskForm extends Component {


	//set the initial state
	state = {
		taskTitle: "",
		taskComplete: false,
		taskEntry: "",
		dateOfCompletion: "",
		userId: "",
		id: [],
		loadingStatus: true,
		modal: false
	};

	activeUserId = parseInt(sessionStorage.getItem("userId"))

//   const element = <FontAwesomeIcon icon={fas fa-plus-circle fa-1x} />

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

	addTask = evt => {
		evt.preventDefault();
		this.toggle();
		if (this.state.taskTitle === "" || this.state.taskEntry === "") {
			window.alert("Please input a task");
		} else {
			this.setState({ loadingStatus: true });
			const addedTask = {
				taskTitle: this.state.taskTitle,
				taskEntry: this.state.taskEntry,
				dateOfCompletion: this.state.dateOfCompletion,
				taskComplete: false
			};

			APIManager.post("tasks", addedTask)
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
				<Button className="addTask" color="success" onClick={this.toggle}>
                Add Task</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle} close={closeBtn}>
						Create Task
					</ModalHeader>
					<ModalBody>
						<form>
							<fieldset>
								<div className="formgrid">
									<label htmlFor="taskTitle">
										Task Name:
									</label>
									<input
										type="text"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="taskTitle"
										value={this.state.taskTitle}
									/>

									<label htmlFor="task">Task Entry:</label>
									<input
										type="text"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="taskEntry"
										value={this.state.taskEntry}
									/>

									<label htmlFor="task">Date to Complete By:</label>
									<input
										type="date"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="taskCompletion"
										value={this.state.dateOfCompletion}
									/>
								</div>
								<div className="alignRight">
								</div>
							</fieldset>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={this.addTask}
						>
							Add
						</Button>{" "}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default AddTaskForm;
