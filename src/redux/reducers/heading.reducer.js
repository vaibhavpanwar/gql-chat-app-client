import { headingConstants } from "../constants";

const heading = (state = "V_Chat App", action) => {
  switch (action.type) {
    case headingConstants.CHANGE_HEADING: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default heading;
