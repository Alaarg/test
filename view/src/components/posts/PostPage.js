import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import mongoose from "mongoose";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

export class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      loggedUser: {},
      postId: ""
    };

    this.addComment = this.addComment.bind(this);
  }

  postCreationTime() {
    const { postId } = this.state;

    if (!postId) return;

    const isoDate = mongoose.Types.ObjectId(postId).getTimestamp();
    const mom = new moment(isoDate);
    const now = new moment();
    const duration = moment.duration(now.diff(mom));

    return duration.humanize();
  }

  componentDidMount() {
    const postId = this.props.location.state._id;

    let loggedUser = localStorage.user;
    if (loggedUser) loggedUser = JSON.parse(loggedUser);

    this.setState({
      postId,
      loggedUser
    });

    Axios.get(`/comments/${postId}`)
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(err => console.log(err));
  }

  addComment(commentInput) {
    const { postId, loggedUser } = this.state;

    const newComment = {
      postId: postId,
      userId: loggedUser._id,
      text: commentInput,
      user: {
        name: loggedUser.name,
        image: loggedUser.image
      }
    };

    Axios.post("/comments", newComment)
      .then(res => {
        this.setState({ comments: [...this.state.comments, res.data] });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { code, text, title, user } = this.props.location.state;
    return (
      <div className="container">
        <div className="post_item">
          <div className="User_info">
            <div className="user_img">
              <img src={user.image ? user.image : ""} alt={`${user.name}`} />
            </div>
            <div className="user_name">{user.name}</div>
            <span className="userinfo_date float-right">
              {this.postCreationTime()} ago
            </span>
          </div>
          <div className="post">
            <h4>{title}</h4>
            <p className="text">{text}</p>
            <pre className="code bg-dark p-3 text-light">{code}</pre>
          </div>
          <div className="add-comment">
            {this.state.loggedUser ? (
              <AddComment addComment={this.addComment} />
            ) : (
              <Link to="/register" className="btn btn-outline-dark">
                Register to add a comment
              </Link>
            )}
          </div>
        </div>
        <h2 className="text-muted text-center m-5 p-2 rounded">Comments List</h2>
        <div className="comments">
          {this.state.comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostPage;
