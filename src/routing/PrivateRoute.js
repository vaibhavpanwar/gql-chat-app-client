import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { user, isLoggedIn } = auth;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn && !Object.keys(user).length > 0 ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
