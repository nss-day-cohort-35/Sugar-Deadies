import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Home from "./home/Home"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Home />
            // Returns the component which will show the dashboard
          }}
        />

        <Route path="/login" render={props => {
          return <Login setUser={this.props.setUser} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
