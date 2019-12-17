import React from "react";
import { connect } from "react-redux";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import VideoGrid from "../modules/VideoGrid";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import MoreButton from "../modules/MoreButton";
import { mainMenuItems } from "../../settings";

import { fetchVideos, clearError } from "../../actions/app";

class Home extends React.Component {
  state = {
    videos: null,
    error: null
  };

  componentDidMount = async () => {
    await this.props.fetchVideos({ chart: "mostPopular" });
    if (this.props.error) {
      this.setState({
        error: this.props.error
      });
      return;
    }
    this.setState({
      videos: {
        pageInfo: this.props.videos.pageInfo,
        items: this.props.videos.items,
        nextPageToken: this.props.videos.nextPageToken
      }
    });
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchNextPageVideos = async () => {
    const { nextPageToken } = this.props.videos;
    await this.props.fetchVideos({ chart: "mostPopular" }, nextPageToken);
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
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        <div className="mb-3"></div>
        {!this.state.error && !this.state.videos && <Loading />}
        {this.state.error && <ErrorMessage message={this.props.error} />}
        {this.state.videos && (
          <div>
            <VideoGrid videos={this.state.videos.items} />
            {this.state.videos.nextPageToken && (
              <div className="mt-3" style={{ width: "50%", margin: "0 auto" }}>
                <MoreButton onClickMore={this.fetchNextPageVideos} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchVideos, clearError })(Home);
