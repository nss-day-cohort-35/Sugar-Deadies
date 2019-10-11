// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display individual tasks
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditTaskForm from "../task/EditTaskForm"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class TaskCard extends Component {

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
		APIManager.delete("tasks", id)
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
							Task Name:{this.props.task.taskTitle}
							<span className="card-taskTitle"></span>
						</h3>

						<p>Entry:{this.props.task.taskEntry}</p>

						<p>Date: {this.props.task.taskComplete}</p>

						<button
							type="button"
							onClick={() =>
								this.handleDelete(this.props.task.id)
							}
						>
							Delete
						</button>

						<button
							type="button"
							onClick={() => {
								this.toggle()
							}}
						>
							Edit
						</button>

						Task Complete?
						<input
							type="checkbox"
							onClick={() =>
								this.handleDelete(this.props.task.id)
							}
							className="checkbox" />

						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader
								toggle={this.toggle}
								close={closeBtn}>
								Edit Task
							</ModalHeader>
							<ModalBody>
								<EditTaskForm {...this.props} taskId={this.props.task.id} getData={this.props.getData} toggle={this.toggle} />
							</ModalBody>


						</Modal>

					</div>
				</div>
			</>
		);
	}
}

export default TaskCard;