// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: Holds the registration data and returns the registration input fields.

import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Reactstrap Modal code from line 10 to 21
class Register extends Component {

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

    handleRegister = (e) => {
        e.preventDefault()
        /*
            For now, just store the email and password that
            the customer enters into session storage.
        */
       e.preventDefault()
       let credentials = {email: this.state.email, password: this.state.password}
       this.props.setUser(credentials);
       this.props.history.push("/");

        //This determines which page you land on upon registration.
        this.props.history.push("/");

    }

    //Registration modal code goes here. 👇
    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (

             <div>
             <Button color="success" onClick={this.toggle}>Register</Button>
             <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
               <ModalHeader toggle={this.toggle} close={closeBtn}>Create Your Account</ModalHeader>
               <ModalBody>
               <form onSubmit={this.handleLogin}>
                <fieldset>
                    <div className="formgrid">
                    <input onChange={this.handleFieldChange} type="name"
                            id="name"
                            placeholder="Full Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputName">Name</label>

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
           </div>
        )
    }
}

export default Register