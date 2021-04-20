import { combineReducers } from "redux";
import heading from "./heading.reducer";
import auth from "./auth.reducer";
import message from "./message.reducer";

export default combineReducers({
  heading,
  auth,
  message,
});
