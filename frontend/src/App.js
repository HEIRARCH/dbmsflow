import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import dbmsflow from "./components/dbmsflow";
import Header from "./components/Header";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useEffect, useState} from "react";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      setLoading(false)
      // console.log(authUser);
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontSize: "1.5rem",
        color: "#007cd4"
      }}>
        <div style={{
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #007cd4",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
          marginBottom: "10px"
        }}></div>
        Loading, please wait...
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/" component={dbmsflow} />
          <PrivateRoute exact path="/add-question" component={AddQuestion} />
          <PrivateRoute exact path="/question" component={ViewQuestion} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;