// TO DELETE AFTER REFACTORING
import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_PLAY_LIST,
  FETCH_VIDEOS,
  SEARCH_VIDEOS,
  FETCH_CHANNEL_INTRO,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  FETCH_COMMENTS,
  FETCH_COMMENTS_DISABLED,
  ADD_COMMENT,
  REPLY_COMMENT,
  // UPDATE_COMMENT,
  // DELETE_COMMENT,
  CATCH_ERROR,
  CLEAR_ERROR,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  FETCH_REPLIES,
} from "../actions/types";

export const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case FETCH_COMMENTS_DISABLED:
      return action.payload;
    case FETCH_REPLIES:
      return {
        ...state,
        replies: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        myComments: state.myComments
          ? [action.payload, ...state.myComments]
          : [action.payload],
      };
    case REPLY_COMMENT:
      return {
        ...state,
        myReplies: state.myReplies
          ? [action.payload, ...state.myReplies]
          : [action.payload],
      };
    default:
      return state;
  }
};

export const videosReducer = (state = null, action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return action.payload;
    case FETCH_VIDEOS:
      return action.payload;
    default:
      return state;
  }
};

export const videoReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_VIDEO:
      return action.payload;
    default:
      return state;
  }
};

export const playlistDetailReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAY_LIST_DETAIL:
      return {
        pageInfo: action.payload.pageInfo,
        items: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
      };
    default:
      return state;
  }
};

export const playlistReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAY_LIST:
      return {
        pageInfo: action.payload.pageInfo,
        items: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
      };

    default:
      return state;
  }
};

export const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHANNEL:
      return {
        pageInfo: action.payload.pageInfo,
        items: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
      };
    case FETCH_CHANNEL_INTRO:
      return {
        items: action.payload.items,
      };
    case FETCH_CHANNEL_SUBSCRIPTION:
      return {
        ...state,
        isSubscribed: action.payload,
      };
    default:
      return state;
  }
};

export const subscriptionReducer = (state = null, action) => {
  switch (action.type) {
    case SUBSCRIBE_CHANNEL:
      return action.payload;
    case UNSUBSCRIBE_CHANNEL:
      return null;
    default:
      return state;
  }
};

export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case CATCH_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};
