// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { ModalBody } from "reactstrap";
// import "./taskForm.css";

class EditTaskForm extends Component {
	//set the initial state
	state = {
		taskTitle: "",
		taskEntry: "",
		taskComplete: false,
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

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

	updateExistingTask = evt => {
		evt.preventDefault();
		this.toggle();
		this.setState({ loadingStatus: true });
		const editedTask = {
			id: parseInt(this.props.taskId),
			taskTitle: this.state.taskTitle,
			taskEntry: this.state.taskEntry,
			taskComplete: this.state.taskComplete,
			userId: this.state.activeUser
		};
		console.log(editedTask)
		APIManager.update("tasks", editedTask)
			.then(() => {
				APIManager.getAll("tasks")
					.then(newTasks => {
						this.setState({
							tasks: newTasks
						});
					});
				this.props.history.push("/")
			});
	}


	componentDidMount() {
		APIManager.get("tasks", this.props.taskId)
			.then(task => {
				this.setState({
					taskTitle: task.taskTitle,
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
									id="taskEntry"
									value={this.state.taskEntry}
								/>
								<label htmlFor="task">Date of Completion</label>
							</div>
							{/* <div className="alignRight">
								<button
									type="button"
									disabled={this.state.loadingStatus}
									onClick={this.updateExistingTask}
									className="btn btn-primary"
								>
									Submit
									</button>
									<button
									type="button"
									disabled={this.state.loadingStatus}
									onClick={this.toggle}
									className="btn btn-primary"
								>
									Cancel
									</button>
							</div> */}
						</fieldset>
					</form>
				</ModalBody>
				{/* </Modal> */}
			</>
		);
	}
}


export default EditTaskForm;
