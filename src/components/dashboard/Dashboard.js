import React, { Component } from 'react';
// import FriendList from "../friends/FriendList"
import NewsList from "../news/NewsList"
// import EventList from "../event/EventList"
import TaskList from "../task/TaskList"
// import MessageList from "../message/MessageList"


class Dashboard extends Component {
    render() {
        return (
            <>
            <section className="left">
            {/* <FriendList /> */}
            </section>

            <section className="center">
            <NewsList {...this.props} />
            {/* <EventList /> */}
            <TaskList {...this.props}/>
            </section>

            <section className="right">
            {/* <MessageList />*/}
            </section>

            </>
        )
    }
}

export default Dashboard;