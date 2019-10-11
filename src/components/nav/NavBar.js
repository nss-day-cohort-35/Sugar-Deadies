import React, { Component } from "react"
import { Link, withRouter} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'



class NavBar extends Component {

    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

    logOut = (event) => {
        sessionStorage.removeItem("activeUser")
        this.props.history.push("/login")
    }


    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 ">
        <div className="logoimg">
          <picture >
            <img className="logo" src={require('../../images/dayofthedeadlogo.png')} alt="Employee" />
          </picture>
        </div>
                <ul className="nav nav-pills nav-fill">
                    <li><span className="nav-link" onClick={this.logOut}>Logout</span></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar);
