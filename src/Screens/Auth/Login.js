import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../gql/queries";
import { authConstants, headingConstants } from "../../redux/constants";

const Login = ({ history }) => {
  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, user } = auth;

  //component level state
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  //get user details with token
  const [getUserData, { loading: loadingA }] = useLazyQuery(getUser, {
    onCompleted(data) {
      if (data?.getUser) {
        dispatch({
          type: authConstants.USER_LOAD_SUCCESS,
          payload: data?.getUser,
        });
      }
    },

    onError(err) {
      dispatch({
        type: authConstants.USER_LOGIN_FAIL,
      });
      setError(err);
    },
  });

  //get token with credentials
  const [loginUser, { loading }] = useLazyQuery(login, {
    onCompleted(data) {
      if (data?.login?.token) {
        getUserData({ variables: { token: data.login.token } });

        dispatch({
          type: authConstants.USER_LOGIN_SUCCESS,
          payload: data.login.token,
        });
      }
    },

    onError(err) {
      dispatch({
        type: authConstants.USER_LOGIN_FAIL,
      });
      setError(err);
    },
  });

  useEffect(() => {
    dispatch({
      type: headingConstants.CHANGE_HEADING,
      payload: "Account Login",
    });
    if (isLoggedIn && Object.keys(user).length > 0) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [dispatch, isLoggedIn, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim().length === 0) return;
    loginUser({ variables: { email: email.trim(), password } });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        {error && <h5>{"Something Went Wrong"}</h5>}
        {loadingA && <h5>Loading</h5>}\
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input type="submit" value={loading ? "Loading.." : "Login"}></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
