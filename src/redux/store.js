import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import Reducers from "./reducers";

export const makeStore = (initialState) => {
  const middlewares = [thunkMiddleware, logger];
  return createStore(
    Reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};
