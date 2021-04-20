import { authConstants } from "../constants";

const auth = (state = { user: {} }, action) => {
  switch (action.type) {
    case authConstants.USER_LOGIN_SUCCESS:
    case authConstants.USER_REGISTER_SUCCESS: {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    case authConstants.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case authConstants.USER_LOGIN_FAIL:
    case authConstants.USER_REGISTER_FAIL:
    case authConstants.USER_LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    }

    default:
      return state;
  }
};

export default auth;
