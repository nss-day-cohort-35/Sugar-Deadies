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