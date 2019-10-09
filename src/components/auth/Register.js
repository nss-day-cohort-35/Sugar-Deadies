// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: Holds the registration data and returns the registration input fields.

import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIManager from '../../modules/APIManger'


//Reactstrap Modal code from line 10 to 21
class Register extends Component {

    // Set initial state
        state = {
          email: "",
          password: "",
          modal: false
        };
      toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    handleRegister = (e) => {
        e.preventDefault()
        console.log(e)
        this.toggle()
        APIManager.getAll("users").then((users) => {
          console.log(users)
          let isMatch = users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())
          if(isMatch){
              window.alert("This email already exists! Please go back to login page.")
          } else if(this.state.email === "" || this.state.password === ""){
              window.alert("You left a field blank!")
          } else {
          let newUser = {
              email: this.state.email,
              password: this.state.password
          };
          console.log(newUser)
          APIManager.post("users", newUser)
          .then(() => APIManager.getAll("users").then(users => users.find(user => user.password === this.state.password))
          .then(foundUser => {
            console.log(foundUser)
              sessionStorage.setItem("userId", foundUser.id)})
              .then(() =>
              //This determines which page you land on upon registration
              this.props.history.push("/")))
          }
      })

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
               <form>
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
                 <Button color="primary" onClick={this.handleRegister}>Create Account!</Button>{' '}
                 <Button color="secondary" onClick={this.toggle}>Cancel</Button>
               </ModalFooter>
             </Modal>
           </div>
        )
    }
}

export default Register