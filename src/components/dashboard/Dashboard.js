import React, { Component } from 'react';
// import FriendList from "../friends/FriendList"
// import NewsList from "../news/NewsList"
// import EventList from "../event/EventList"
import TaskList from "../task/TaskList"
// import MessageList from "../message/MessageList"

class Dashboard extends Component {
    render() {
        return (
            <>
            {/* <FriendList />
            <NewsList />
            <EventList /> */}
        <TaskList {...this.props}/>
            {/* <MessageList />*/}
            </>
        )
    }
}

export default Dashboard;