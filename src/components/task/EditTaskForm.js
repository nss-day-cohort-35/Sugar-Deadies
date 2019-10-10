// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./taskForm.css";

class EditTaskForm extends Component {
	//set the initial state
	state = {
		taskTitle: "",
		taskComplete: "",
		userId: "",
		taskEntry: "",
		id: [],
		loadingStatus: true,
        modal: false,
        allTasks: []

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
			id: this.props.match.params.taskId,
			taskTitle: this.state.taskTitle,
            taskEntry: this.state.taskEntry,
            userId: parseInt(this.state.userId)
		};

		APIManager.update(editedTask).then(() =>
			this.props.history.push("/tasks")
		);
	};

	componentDidMount() {
		APIManager.getAll("tasks").then(allTasks => {
			APIManager.get(this.props.match.params.taskId).then(task => {
				this.setState({
					taskTitle: task.taskTitle,
					userId: task.userId,
					loadingStatus: false,
					allTasks: allTasks
				});
			});
		});
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
				<Button color="success" onClick={this.toggle}>
					Edit Task
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle} close={closeBtn}>
						Edit Task
					</ModalHeader>
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
										task title
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
								</div>
								<select
									className="form-control"
									id="taskId"
									value={this.state.taskId}
									onChange={this.handleFieldChange}
								>
									{this.state.allTasks.map(task => (
										<option key={task.id} value={task.id}>
											{task.taskTitle}
										</option>
									))}
								</select>
								<div className="alignRight">
									<button
										type="button"
										disabled={this.state.loadingStatus}
										onClick={this.updateExistingTask}
										className="btn btn-primary"
									>
										Submit
									</button>
								</div>
							</fieldset>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={this.updateExistingTask}
						>
							Edit 
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

export default EditTaskForm;
