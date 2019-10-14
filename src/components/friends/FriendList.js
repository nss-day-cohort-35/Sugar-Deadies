// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all friends

import React, { Component } from "react";
// import MessageCard from "../event/MessageCard"
import APIManager from "../../modules/APIManager";
import "../friends/friend.css";

// import AddFriendCard from "./AddFriendCard"

class FriendList extends Component {
  //define what this component needs to render
   state = {
   friends: [],
   modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteFriend = id => {
    APIManager.delete("friends", id).then(() => {
      APIManager.getAll("friends").then(newFriends => {
        this.setState({
          friends: newFriends
        });
      });
    });
  };

  getData = () => APIManager.getAll("friends");

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("friends").then(friends => {
      this.setState({
        friends: friends
      });
    });
  }

  render() {
    return (
      <>
      <div className="friends-container">
      <div className="friends-intro">
      <h1>Friends</h1>
      <img className="task-img" src={require('../../images/addfriends.png')} alt="logo" />
    {/* <AddEventForm {...this.props}/> */}
</div>
    <div className="friends-container-cards">
   {/* {this.state.tasks.map(event => (
   <EventCard
    key={event.id}
    event={event}
 deleteEvent={this.deleteEvent}
  {...this.props}
/>
))} */}
 </div>
    </div>
    </>
    );
  }
}

export default FriendList;
