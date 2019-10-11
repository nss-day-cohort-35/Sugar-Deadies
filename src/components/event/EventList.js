// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all events

import React, { Component } from "react";
import EventCard from "../event/EventCard"
import APIManager from "../../modules/APIManager";
import AddEventForm from "./AddEventForm"

class EventList extends Component {
  //define what this component needs to render
  state = {
    events: [],
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteEvent = id => {
    APIManager.delete("events", id).then(() => {
      APIManager.getAll("events").then(newEvents => {
        this.setState({
          events: newEvents
        });
      });
    });
  };

  getData = () => APIManager.getAll("events").then(events => {
    this.setState({
      events: events
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("events").then(events => {
      this.setState({
        events: events
      });
    });
  }

  render() {
    return (
      <>
        <div className="events-container">
          <h1>Events</h1>
          <AddEventForm {...this.props} />

          <div className="container-cards">
            {this.state.events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                deleteEvent={this.deleteEvent}
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

export default EventList;
