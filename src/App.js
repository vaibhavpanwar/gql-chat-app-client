import ApolloProvider from "./apollo/ApolloProvider";
import { Provider } from "react-redux";
import { makeStore } from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Screens/Chat";
import Register from "./Screens/Auth/Register";
import Login from "./Screens/Auth/Login";
import Home from "./Screens/Home";
import Navbar from "./components/Layout/Navbar";
import MainHeading from "./components/Layout/MainHeading";
import { useEffect } from "react";
import { getUser } from "./gql/queries";
import { client } from "./apollo/ApolloProvider";
import { authConstants } from "./redux/constants";
import PrivateRoute from "./routing/PrivateRoute";

function App() {
  const store = makeStore({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      runQuery(token);
    }

    // eslint-disable-next-line
  }, []);

  //to login user on refresh with localstorage token
  const runQuery = async (token) => {
    const getUserData = await client.query({
      query: getUser,
      variables: { token },
    });
    if (getUserData?.data?.getUser) {
      store.dispatch({
        type: authConstants.USER_LOAD_SUCCESS,
        payload: getUserData.data.getUser,
      });
    }
  };

  return (
    <ApolloProvider>
      <Provider store={store}>
        {/* container */}
        <Router>
          <Navbar />
          <MainHeading />
          <div className="main-container">
            <div className="container">
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/:roomId" component={Chat} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
