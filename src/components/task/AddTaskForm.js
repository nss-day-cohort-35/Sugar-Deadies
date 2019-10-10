// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold add task form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./taskForm.css";

class AddTaskForm extends Component {
	//set the initial state
	state = {
		taskTitle: "",
		taskComplete: "",
		userId: "",
		taskEntry: "",
		id: [],
		loadingStatus: true,
        modal: false
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
            taskComplete: false
		};

		APIManager.post("tasks",addedTask).then(() =>
			this.props.history.push("/")
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
				<Button color="success" onClick={this.toggle}>
                Add Task				</Button>
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
									<input
										type="text"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="taskTitle"
										value={this.state.taskTitle}
									/>
									<label htmlFor="taskTitle">
										Task Name
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
							add 
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
