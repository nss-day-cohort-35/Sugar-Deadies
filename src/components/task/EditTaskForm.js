// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";
import "../task/task.css";

class EditTaskForm extends Component {
	//set the initial state
	state = {
		taskTitle: "",
		taskEntry: "",
		dateOfCompletion: "",
		taskComplete: false,
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingTask = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedTask = {
			id: parseInt(this.props.taskId),
			taskTitle: this.state.taskTitle,
			taskEntry: this.state.taskEntry,
			taskComplete: this.state.taskComplete,
			dateOfCompletion: this.state.dateOfCompletion,
			userId: this.state.activeUser
		};
		console.log(editedTask)
		APIManager.update("tasks", editedTask)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("tasks", this.props.taskId)
			.then(
				task => {
					this.setState({
						taskTitle: task.taskTitle,
						taskEntry: task.taskEntry,
						loadingStatus: false,
					});
				});
	};

	render() {
		// const closeBtn = (
		// 	<button className="close" onClick={this.toggle}>
		// 		&times;
		// 	</button>
		// );
		return (
			<>
				{/* <Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				> */}
				{/* <ModalHeader toggle={this.toggle} close={closeBtn}>
						Edit Task
					</ModalHeader> */}
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="taskTitle"
									value={this.state.taskTitle}
								/>
								<label htmlFor="taskTitle">
									Task Title
									</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="taskEntry"
									value={this.state.taskEntry}
								/>
								<label htmlFor="task">Entry</label>

								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="dateOfCompletion"
									value={this.state.dateOfCompletion}
								/>
								<label htmlFor="task">Date of Completion</label>
							</div>
							<div className="alignRight">

							</div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={(evt) => {
							this.updateExistingTask(evt)
							this.props.toggle()
						}}
						className="btn btn-primary"
					>
						Submit
									</Button>
					<Button className="cancel" onClick={this.props.toggle}>Cancel</Button>
				</ModalFooter>
				{/* </Modal> */}
			</>
		);
	}
}


export default EditTaskForm;
