// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display individual tasks
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";

import EditTaskForm from "./EditTaskForm";
class TaskCard extends Component {
	handleDelete = id => {
		APIManager.delete("tasks", id).then(() => this.props.history.push("/tasks"))
	};
	render() {
		return (
			<>
				<div className="card">
					<div className="card-content">
						<h3>
							Name:{this.props.task.taskTitle}
							<span className="card-taskTitle"></span>
						</h3>
						<p>Date {this.props.task.taskComplete}</p>

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
								this.props.history.push(
									`/tasks/${this.props.task.id}edit`
								);
							}}
						>
							{/* <EditTaskForm>Edit</EditTaskForm> */}
						</button>
						<input type="checkbox" className="checkbox" />
					</div>
				</div>
			</>
		);
	}
}

export default TaskCard;