// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display all task
import React, { Component } from "react";
import NewsCard from "./NewsCard"
import APIManager from "../../modules/APIManager";
import AddNewsForm from "./AddNewsForm"

class NewsList extends Component {
  //define what this component needs to render
   state = {
   allNews: [],

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
      APIManager.getAll("news", this.activeUserId).then(arrayOfNews => {
        this.setState({
          allNews: arrayOfNews
        });
      });
    });
  };

  getData = () => APIManager.getAll("news", this.activeUserId).then(arrayOfNews => {
    this.setState({
      allNews: arrayOfNews
    });
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    console.log("news list mounted")
    APIManager.getAll("news", this.activeUserId).then(arrayOfNews => {
      console.log(arrayOfNews)
      this.setState({
        allNews: arrayOfNews
      });
    });
  }

  render() {
    return (
      <>
      <div className="news-container">
      <div className="news-intro">
      <h1>News</h1>
      <img className="news-img" src={require('../../images/addyournews.png')} alt="logo" />
      </div>
      <AddNewsForm {...this.props} 
      getData  = {this.getData}/>
        <div className="news-container-cards">
          {this.state.allNews.map(singleNews => (
            <NewsCard
              key={singleNews.id}
              news={singleNews}
              deleteNews={this.deleteNews}
              {...this.props}
              getData  = {this.getData}
            />
          ))}
        </div>
        </div>
      </>
    );
  }
}

export default NewsList;
