// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold add news form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../news/news.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas fa-plus-circle fa-1x } from '@fortawesome/free-solid-svg-icons'

class AddNewsForm extends Component {


	//set the initial state
	state = {
		articleTitle: "",
		createDate: "",
		articleURL: "",
		userId: "",
		id: [],
		loadingStatus: true,
		modal: false
	};

	activeUserId = parseInt(sessionStorage.getItem("userId"))

//   const element = <FontAwesomeIcon icon={fas fa-plus-circle fa-1x} />

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	addNews = evt => {
		evt.preventDefault();
		this.toggle();
		if (this.state.articleTitle === "" || this.state.articleURL === "") {
			window.alert("Please input a title and url");
		} else {
			this.setState({ loadingStatus: true });
			const addedNews = {
				userId: this.activeUserId,
				articleTitle: this.state.articleTitle,
				articleURL: this.state.articleURL,
				createDate: this.state.createDate,
			};

			APIManager.post("news", addedNews)
				.then(() => { this.props.getData() }
				);
		};
	}
	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				&times;
				</button>
		);
		return (
			<>
				{" "}
				<Button className="addNews" onClick={this.toggle}>
                Add New Article</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle} close={closeBtn}>
						Create News
					</ModalHeader>
					<ModalBody>
						<form>
							<fieldset>
								<div className="formgrid">
									<label htmlFor="articleTitle">
										News Title:
									</label>
									<input
										type="text"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="articleTitle"
										value={this.state.articleTitle}
									/>

									<label htmlFor="articleURL">Article URL:</label>
									<input
										type="url"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="articleURL"
										value={this.state.articleURL}
									/>

									<label htmlFor="createDate">Today's Date</label>
									<input
										type="date"
										required
										className="form-control"
										onChange={this.handleFieldChange}
										id="createDate"
										value={this.state.createDate}
									/>
								</div>
								<div className="alignRight">
								</div>
							</fieldset>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button
						className="add"
							color="primary"
							onClick={this.addNews}
						>
							Add
						</Button>{" "}
						<Button className="cancel" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default AddNewsForm;
