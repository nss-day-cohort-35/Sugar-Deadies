// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";
import "../news/news.css";

class EditNewsForm extends Component {
	//set the initial state
	state = {
		articleTitle: "",
		articleURL: "",
		createDate: "",
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingNews = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedNews = {
			id: parseInt(this.props.newsId),
			articleTitle: this.state.articleTitle,
			articleURL: this.state.articleURL,
			createDate: this.state.createDate,
			userId: this.state.activeUser
		};
		console.log(editedNews)
		APIManager.update("news", editedNews)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("news", this.props.newsId)
			.then(
				news => {
					this.setState({
						articleTitle: news.articleTitle,
						articleURL: news.articleURL,
						createDate: news.createDate,
						loadingStatus: false,
					});
				});
	};

	render() {
		// const closeBtn = (
		// 	<button className="close" onClick={this.toggle}>
		// 		&times;
		// 	</button>
		// );
		return (
			<>
				{/* <Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				> */}
				{/* <ModalHeader toggle={this.toggle} close={closeBtn}>
						Edit Task
					</ModalHeader> */}
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="articleTitle"
									value={this.state.articleTitle}
								/>
								<label htmlFor="articleTitle">
									Name of Article
								</label>

								<input
									type="url"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="articleURL"
									value={this.state.articleURL}
								/>
								<label htmlFor="articleURL">
									URL of Article
								</label>

								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="createDate"
									value={this.state.createDate}
								/>
								<label htmlFor="createDate">Today's Date</label>
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingNews(evt);
							this.props.toggle();
						}}
						className="btn btn-primary"
					>
						Submit
					</Button>
					<Button className="cancel" onClick={this.props.toggle}>
						Cancel
					</Button>
				</ModalFooter>
				{/* </Modal> */}
			</>
		);
	}
}


export default EditNewsForm;
