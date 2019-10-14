// Authors: Gradi, Mark, Quin, Sage
// Purpose of the file to display individual tasks
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditNewsForm from "../news/EditNewsForm"
import "../news/news.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class NewsCard extends Component {

	state = {
		modal: false
	};

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	activeUserId = parseInt(sessionStorage.getItem("userId"))

	handleDelete = id => {
		APIManager.delete("news", id)
			.then(() => { this.props.getData() }
			);
	}

	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				&times;
			</button>
		);
		return (
			<>
				<div className="card">
					<div className="card-content">
						<h3>
							Article Title: {this.props.news.articleTitle}
							<span className="card-articleTitle"></span>
						</h3>

						<p>Article URL: {this.props.news.articleURL}</p>

						<p>Date: {this.props.news.createDate} </p>

						<button
							type="button"
							className="delete"
							onClick={() =>
								this.handleDelete(this.props.news.id)
							}
						>
							Delete
						</button>

						<button
							type="button"
							className="edit"
							onClick={() => {
								this.toggle();
							}}
						>
							Edit
						</button>

						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader toggle={this.toggle} close={closeBtn}>
								Edit News
							</ModalHeader>
							<ModalBody>
								<EditNewsForm
									{...this.props}
									newsId={this.props.news.id}
									getData={this.props.getData}
									toggle={this.toggle}
								/>
							</ModalBody>
						</Modal>
					</div>
				</div>
			</>
		);
	}
}

export default NewsCard;