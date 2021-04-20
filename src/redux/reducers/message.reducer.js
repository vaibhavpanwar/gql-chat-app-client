import { messageConstants } from "../constants";

const messages = (state = { messages: [] }, action) => {
  switch (action.type) {
    case messageConstants.FETCH_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case messageConstants.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case messageConstants.FETCH_MESSAGES_FAIL: {
      return {
        messages: [],
      };
    }

    default:
      return state;
  }
};

export default messages;
