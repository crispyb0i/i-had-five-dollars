import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebaseConfig from "../../firebase.js";
import { AuthContext } from "../Auth/Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseConfig
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const redirect = ()=> {
    history.push("/signUp");
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log(currentUser)
    return <Redirect to="/profile" />;
  }

  return (
    <div className="loginDiv">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={redirect}>Sign Up</button>
    </div>
  );
};

export default withRouter(Login);
