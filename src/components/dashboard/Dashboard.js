import React, { Component } from 'react';
import FriendList from "../friends/FriendList"
import NewsList from "../news/NewsList"
import EventList from "../event/EventList"
import TaskList from "../task/TaskList"
import MessageList from "../message/MessageList"



class Dashboard extends Component {
    render() {
        return (
            <div className="main">
            <section className="leftSection">
            <FriendList {...this.props} />
            </section>

            <section className="mainSection">
            <section className="welcome">
            <img className="welcomelogo" src={require('../../images/welcomeimage.png')} alt="logo" />
            <h4><strong>October 31-November 2, 2019</strong><br></br><br></br>Day of the Dead or Dia De Los Muertos,
             is a two day holiday that reunites the living and dead. It is a rare holiday for
             celebrating death and life. It is unlike any holiday where mourning is exchanged for celebration.</h4>
            </section>
            <div className="taskNews">
            <NewsList {...this.props} />
            <TaskList {...this.props}/>
            </div>
            <EventList {...this.props}/>
            </section>

            <section className="rightSection">
            <MessageList {...this.props} />
            </section>
        </div>

        )
    }
}

export default Dashboard;