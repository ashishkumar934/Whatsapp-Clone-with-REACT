import React, { useContext } from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./Stateprovider";
import { actionTypes } from "./reducer";
import { StateContext } from "./Stateprovider";

function Login() {
  const [user, dispatch] = useContext(StateContext);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => alert("error.message"));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          alt="whatsapp logo"
          src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"
        />
        <div className="login_text">
          <h1> Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
