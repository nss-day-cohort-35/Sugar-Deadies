//Kennel.js equivalent for Sugar-Deadies
// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold functionality for sessionStorage for login, renders the <Navbar> and <ApplicationViews.js>

//<Dashboard.js> renders the <NavBar> and <ApplicationViews> in the place of <Nutshell.js>
import React, { Component } from 'react'

//Style sheet for the elements contained within the Dashboard.js component.
import '../src/Dashboard.css'

import ApplicationViews from './components/ApplicationViews'


import NavBar from './components/nav/NavBar'
//.css files hold the styling for the cards created on each of the lists.
import './components/friends/friend.css'
import './components/message/message.css'
import './components/task/task.css'
import './components/news/news.css'
import './components/event/event.css'
import '../src/index.css'

//Components are the building blocks of any React app and a typical React app will have many of these. Simply put, a component is a JavaScript class or function that optionally accepts inputs i.e. properties(props) and returns a React element that describes how a section of the UI (User Interface) should appear.

class Dashboard extends Component {
  //On startup, there is no user (user: false)
  state = {
    user: sessionStorage.getItem("credentials") !== null
  }

  // Check if credentials are in session storage
  //returns true/false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  setUser = (authObj) => {
    /*
      For now, just store the email and password that
      the user enters into session storage.
    */
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    sessionStorage.clear()

    this.setState({
      user: this.isAuthenticated()
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} clearUser={this.clearUser} />
        <ApplicationViews user={this.state.user}
          setUser={this.setUser} />
      </React.Fragment>
    )
  }
}


export default Dashboard;
