import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
