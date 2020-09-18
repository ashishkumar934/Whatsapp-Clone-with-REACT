import React, { useContext } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import Login from "./login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue, StateContext } from "./Stateprovider";

function App() {
  const [user, dispatch] = useContext(StateContext);

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chatbox />
              </Route>
              <Route path="/">
                <Chatbox />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
