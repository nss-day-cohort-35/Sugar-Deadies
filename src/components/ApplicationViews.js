// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: to house the routes/paths to each aspect of our app

import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Register from "./auth/Register"
// import TaskList from "./task/TaskList"
import Dashboard from "./dashboard/Dashboard";
// import EditTaskForm from "./EditTaskForm";
// import AddTaskForm from "./AddTaskForm";


export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Dashboard {...props} />
            // Returns the component which will show the dashboard
          }}
        />

        <Route exact path="/login" render={props => {
          return <Login setUser={this.props.setUser} {...props} />
        }} />

        <Route exact path="/register" render={props => {
          return <Register setUser={this.props.setUser} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
