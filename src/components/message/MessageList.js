// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all messages

import React, { Component } from "react";
// import MessageCard from "../event/MessageCard"
import APIManager from "../../modules/APIManager";
import AddMessage from "./AddMessage"

class MessageList extends Component {
  //define what this component needs to render
   state = {
   messages: [],
   modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteMessage = id => {
    APIManager.delete("messages", id).then(() => {
      APIManager.getAll("messages").then(newMessages => {
        this.setState({
          messages: newMessages
        });
      });
    });
  };

  getData = () => APIManager.getAll("messages");

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("messages").then(messages => {
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
      {/* <AddEventForm {...this.props}/>

        <div className="container-cards">
          {this.state.tasks.map(event => (
            <EventCard
              key={event.id}
              event={event}
              deleteEvent={this.deleteEvent}
              {...this.props}
            />
          ))}
        </div> */}
        </div>
      </>
    );
  }
}

export default MessageList;
