import { useMutation, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../gql/mutations";
import { getUser } from "../../gql/queries";
import { authConstants, headingConstants } from "../../redux/constants";

const Register = ({ history }) => {
  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user, isLoggedIn } = auth;

  //component level state
  const [email, setEmail] = useState("");
  const [password1, setpassword1] = useState("");
  const [fullName, setfullName] = useState("");
  const [password2, setpassword2] = useState("");
  const [error, setError] = useState("");

  //qeury to get user data with token
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

  //mutation to register user
  const [registerUser, { loading }] = useMutation(createUser, {
    update(_, res) {
      if (res?.data?.createUser?.token) {
        getUserData({ variables: { token: res.data.createUser.token } });
        dispatch({
          type: authConstants.USER_REGISTER_SUCCESS,
          payload: res.data.createUser.token,
        });
      }
    },
    oneEror(err) {
      dispatch({
        type: authConstants.USER_REGISTER_FAIL,
      });
      setError("Something Went Wrong");
    },
  });

  useEffect(() => {
    dispatch({
      type: headingConstants.CHANGE_HEADING,
      payload: "Account Register",
    });
    if (isLoggedIn && Object.keys(user).length > 0) {
      history.push("/");
    }

    //eslint-disable-next-line
  }, [dispatch, isLoggedIn]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      window.alert("Password do not match");
    } else {
      registerUser({ variables: { email, password: password1, fullName } });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        {error && <h5>{error}</h5>}
        {loadingA && <h5>Loading......</h5>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Full Name</label>
          <input
            type="text"
            value={fullName}
            required
            onChange={(e) => setfullName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password1}
            required
            onChange={(e) => setpassword1(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            required
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input type="submit" value={loading ? "Loading.." : "Submit"}></input>
        </div>
      </form>
    </div>
  );
};

export default Register;
