import React from "react";
import { connect } from "react-redux";
import {
  addComment,
  replyComment,
  updateComment,
  clearError,
} from "../../actions/app";

class CommentForm extends React.Component {
  state = {
    comment: "",
    error: "",
    isPublishing: false,
    mode: "",
    myComments: null,
  };

  componentDidMount = () => {
    if (this.props.video) {
      this.setState({
        mode: "comment",
      });
    } else if (this.props.commentId) {
      this.setState({
        mode: "reply",
      });
    } else if (this.props.comment) {
      this.setState({
        mode: "update",
        comment: this.props.comment,
      });
    }
  };

  addComment = async () => {
    const accessToken = localStorage.getItem("access_token");
    this.setState({
      isPublishing: true,
    });
    console.log(this.props.video.id, this.props.video.snippet.channelId);
    console.log("publish comment", this.state.comment.trim());
    await this.props.addComment(
      this.props.video.channelId,
      this.props.video.id,
      this.state.comment.trim(),
      accessToken
    );
    if (this.props.error) {
      this.setState({
        error: this.props.error,
        isPublishing: false,
      });
    }
    if (this.props.myComments) {
      this.setState({
        myComments: this.props.myComments,
        isPublishing: false,
        comment: "",
        error: "",
      });
    }
  };

  replyComment = () => {};
  updateComment = () => {};

  handlePublishComment = (e) => {
    e.preventDefault();
    if (this.state.mode === "reply") {
      // Reply a comment
      console.log(this.props.commentId);
      console.log("reply comment", this.state.comment.trim());
    } else if (this.state.mode === "comment") {
      // Add a comment on video
      this.addComment();
    } else if (this.state.mode === "update") {
      // Update a comment/reply
      console.log(this.props.comment);
      console.log("update comment", this.state.comment.trim());
    }
    this.props.clearError();
  };
  handleCancel = () => {
    this.setState({
      comment: "",
      error: "",
      isPublishing: false,
      myComments: null,
    });
  };

  render() {
    return this.props.auth.signedIn ? (
      <div>
        <form onSubmit={this.handlePublishComment}>
          <div className="form-group">
            <label>Publish your comment</label>
            <textarea
              className="form-control"
              name="comment"
              value={this.state.comment}
              onChange={(e) => {
                this.setState({
                  comment: e.target.value,
                });
              }}
            ></textarea>
          </div>
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-info mr-3"
              disabled={!this.state.comment.trim() && this.state.isPublishing}
            >
              {this.state.isPublishing ? "Publishing..." : "Comment"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="text-danger text-center">You are not signed in</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
    myComments: state.comments.myComments,
  };
};
export default connect(mapStateToProps, {
  addComment,
  replyComment,
  updateComment,
  clearError,
})(CommentForm);
