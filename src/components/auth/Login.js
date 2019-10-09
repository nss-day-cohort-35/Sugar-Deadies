// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: Landing page that holds the login and registration data and returns the login and registration input fields.
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Register from "./Register"

//Reactstrap Modal code from line 10 to 21
class Login extends Component {

    // Set initial state
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
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
        /*
            For now, just store the email and password that
            the customer enters into session storage.
        */
       e.preventDefault()
       let credentials = {email: this.state.email, password: this.state.password}
       this.props.setUser(credentials);
       this.props.history.push("/");

        //This determines which page you land on upon login.
        this.props.history.push("/");

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
                 <Button color="primary" onClick={this.toggle}>Sign In!</Button>{' '}
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