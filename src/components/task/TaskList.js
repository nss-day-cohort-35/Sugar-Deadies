// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all task
import React, { Component } from "react";
import TaskCard from "../task/TaskCard";
import APIManager from "../../modules/APIManager";
import AddTaskForm from "./AddTaskForm";

class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    deleteTask = id => {
        APIManager.delete("tasks", id).then(() => {
            APIManager.getAll("tasks").then(newTasks => {
                this.setState({
                    tasks: newTasks
                });
            });
        });
    };

    getData = () => APIManager.getAll("tasks").then(tasks => {
        this.setState({
            tasks: tasks
        });
    });

    componentDidMount() {
        //getAll from APIManager and hang on to that data; put it in state
        APIManager.getAll("tasks").then(tasks => {
            this.setState({
                tasks: tasks
            });
        });
    }

    render() {
        return (
            <>
              <div className="tasks-container">
                <h1>Tasks</h1>
                <AddTaskForm
                {...this.props}
                getData={this.getData} />
                <div className="container-cards">
                    {this.state.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={this.deleteTask}
                            {...this.props}
                            getData={this.getData}
                        />
                    ))}
                </div>
                </div>
            </>
        );
    }
}

export default TaskList;
