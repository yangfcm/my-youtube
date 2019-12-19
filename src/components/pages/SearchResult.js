import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import VideoList from "../modules/VideoList";
import MoreButton from "../modules/MoreButton";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { searchVideos, clearError } from "../../actions/app";

class SearchResult extends React.Component {
  state = {
    videos: null,
    error: null
  };

  searchVideos = async q => {
    await this.props.searchVideos({ q });
    if (this.props.error) {
      this.setState({
        error: this.props.error
      });
      return;
    }
    if (this.props.videos) {
      if (this.props.videos.items.length > 0) {
        this.setState({
          videos: {
            pageInfo: this.props.videos.pageInfo,
            items: this.props.videos.items,
            nextPageToken: this.props.videos.nextPageToken
          }
        });
      } else {
        this.setState({
          error: `No video found with the key word: ${q}`
        });
      }
    }
  };

  componentDidMount = () => {
    const { q } = queryString.parse(this.props.location.search);
    this.searchVideos(q);
  };

  componentDidUpdate = async prevProps => {
    const prevq = queryString.parse(prevProps.location.search).q;
    const { q } = queryString.parse(this.props.location.search);
    if (prevq !== q) {
      this.setState({
        videos: null,
        error: null
      });
      this.searchVideos(q);
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchNextPageVideos = async () => {
    const { q } = queryString.parse(this.props.location.search);
    const { nextPageToken } = this.props.videos;
    await this.props.searchVideos({ q }, nextPageToken);
    this.setState((state, props) => {
      return {
        videos: {
          pageInfo: props.videos.pageInfo,
          items: state.videos.items.concat(props.videos.items),
          nextPageToken: props.videos.nextPageToken
        }
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.error && !this.state.videos && <Loading />}
        {this.state.error && <ErrorMessage message={this.state.error} />}
        {!this.state.error && this.state.videos && (
          <div>
            <VideoList videoList={this.state.videos.items} />

            {this.state.videos.nextPageToken && (
              <div style={{ width: "50%", margin: "0 auto" }}>
                <MoreButton onClickMore={this.fetchNextPageVideos} />
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    error: state.error
  };
};
export default connect(mapStateToProps, { searchVideos, clearError })(
  SearchResult
);