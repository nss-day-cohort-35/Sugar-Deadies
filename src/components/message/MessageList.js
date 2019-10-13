// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all messages

import React, { Component } from "react";
// import MessageCard from "../event/MessageCard"
import APIManager from "../../modules/APIManager";
import AddMessageForm from "./AddMessage"
import MessageCard from "./MessageCard"

class MessageList extends Component {
  //define what this component needs to render
   state = {
   messages: [],
   userID: "",
   modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("userId"))

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteMessage = id => {
    APIManager.delete("messages", id).then(() => {
      APIManager.getAll("messages", this.activeUserId).then(newMessages => {
        this.setState({
          messages: newMessages
        });
      });
    });
  };

  getData = () => APIManager.getAll("messages", this.activeUserId);

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("messages", this.activeUserId).then(messages => {
      this.setState({
        messages: messages
      });
    });
  }

  render() {
    return (
      <>
      <div className="messages-container">
      <div className="message-intro">
      <h1>Messages</h1>
      <img className="message-img" src={require('../../images/chatwithyourfriends.png')} alt="logo" />
      </div>
     <AddMessageForm {...this.props}
      getData={this.getData}
     />

        <div className="container-cards">
          {this.state.messages.map(message => (
            <MessageCard
              key={message.id}
              message={message}
              deleteMessage={this.deleteMessage}
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

export default MessageList;
