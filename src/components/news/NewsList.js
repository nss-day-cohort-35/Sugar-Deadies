// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all task
import React, { Component } from "react";
// import TaskCard from "../task/TaskCard";
import APIManager from "../../modules/APIManager";
// import AddTaskForm from "./AddTaskForm";

class NewsList extends Component {
  //define what this component needs to render
   state = {
   news: [],
   modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("userId"))


  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteTask = id => {
    APIManager.delete("news", id).then(() => {
      APIManager.getAll("news").then(newNews => {
        this.setState({
          news: newNews
        });
      });
    });
  };

  getData = () => APIManager.getAll("news");

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("news").then(news => {
      this.setState({
        news: news
      });
    });
  }

  render() {
    return (
      <>
      <h1>NEWS LIST</h1>
      {/* <AddNewsForm {...this.props}/> */}

        {/* <div className="container-cards">
          {this.state.news.map(task => (
            <NewsCard
              key={news.id}
              news={news}
              deleteNews={this.deleteNews}
              {...this.props}
            />
          ))}
        </div> */}
      </>
    );
  }
}

export default NewsList;
