import { defAxios as axios, maxResults } from "../settings";
import {
  FETCH_CHANNEL,
  FETCH_PLAY_LIST,
  FETCH_RECOMMEND,
  FETCH_CHANNEL_DETAIL,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  FETCH_COMMENTS,
  FETCH_COMMENTS_DISABLED,
  CATCH_ERROR,
  CLEAR_ERROR
} from "./types";

/** Fetch comments by video id */
export const fetchComments = (videoId, pageToken) => {
  return async dispatch => {
    try {
      const response = await axios.get("/commentThreads", {
        params: {
          part: "snippet",
          key: process.env.REACT_APP_API_KEY,
          videoId,
          maxResults,
          pageToken
        }
      });
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response.data.error.errors[0].reason);
      const errorReason = e.response.data.error.errors[0].reason;
      if (errorReason === "commentsDisabled") {
        // Consider comment is disabled by publisher.
        dispatch({
          type: FETCH_COMMENTS_DISABLED,
          payload: errorReason
        });
      } else {
        dispatch({
          type: CATCH_ERROR,
          payload: "Failed to fetch comments"
        });
      }
    }
  };
};

/** Fetch a vidoe by id */
export const fetchVideo = videoId => {
  return async dispatch => {
    try {
      const response = await axios.get("/videos", {
        params: {
          part: "snippet,statistics",
          key: process.env.REACT_APP_API_KEY,
          id: videoId
        }
      });
      dispatch({
        type: FETCH_VIDEO,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch video"
      });
    }
  };
};

/** Fetch playlist by ChannelId*/
export const fetchPlaylist = (
  pageToken,
  channelId = process.env.REACT_APP_MY_CHANNEL_ID
) => {
  return async dispatch => {
    try {
      const response = await axios.get("/playlists", {
        params: {
          part: "snippet,contentDetails",
          maxResults,
          channelId,
          pageToken,
          key: process.env.REACT_APP_API_KEY
        }
      });
      dispatch({
        type: FETCH_PLAY_LIST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch playlist"
      });
    }
  };
};

/** Fetch play list detail */
export const fetchPlaylistDetail = (playlistId, pageToken) => {
  return async dispatch => {
    try {
      const response = await axios.get("/playlistItems", {
        params: {
          part: "snippet,contentDetails",
          maxResults: 8,
          key: process.env.REACT_APP_API_KEY,
          playlistId,
          pageToken
        }
      });
      dispatch({
        type: FETCH_PLAY_LIST_DETAIL,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch playlist"
      });
    }
  };
};

/** Fetch subscribed channels */
export const fetchChannel = pageToken => {
  return async dispatch => {
    try {
      const response = await axios.get("/subscriptions", {
        params: {
          part: "snippet",
          maxResults,
          channelId: process.env.REACT_APP_MY_CHANNEL_ID,
          key: process.env.REACT_APP_API_KEY,
          pageToken
        }
      });
      dispatch({
        type: FETCH_CHANNEL,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch channels"
      });
    }
  };
};

/** Clear Error */
export const clearError = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_ERROR
    });
  };
};
