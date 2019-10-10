// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: Landing page that holds the login and registration data and returns the login and registration input fields.
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Register from "./Register"
import APIManager from "../../modules/APIManager";

//Reactstrap Modal code from line 10 to 21
class Login extends Component {

    // Set initial state

    state = {
        email: "",
        password: "",
        userId: "",
        modal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getAll("users").then((users) => {
            let singleUser = users.find(
                user => 
                user.password.toLowerCase() === this.state.password.toLowerCase() &&
                user.email.toLowerCase() === this.state.email.toLowerCase()
                );
            if (this.state.email === "") {
                window.alert("Please enter email")
            } else if (this.state.password === "") {
                window.alert("Please enter password")
            } else if (singleUser) {
                sessionStorage.setItem("userId", singleUser.id);
                sessionStorage.setItem("email", this.state.email);
                this.props.history.push("/tasks");
            } else {
            window.alert("User email and password do not match")
        }

    })
}


//Login modal code goes here. 👇
render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
    return (

        <div>
            <Button color="success" onClick={this.toggle}>Login</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle} close={closeBtn}>Please Sign In</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.handleLogin}>
                        <fieldset>
                            <div className="formgrid">
                                <input onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="Email address"
                                    required="" autoFocus="" />
                                <label htmlFor="inputEmail">Email address</label>

                                <input onChange={this.handleFieldChange} type="password"
                                    id="password"
                                    placeholder="Password"
                                    required="" />
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleLogin}>Sign In!</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div className="registrationDiv">
                {/* <Register /> calls the component Register and its contents from Register.js to display on the login page. */}
                <Register />
            </div>
        </div>
    )
}

}

export default Login