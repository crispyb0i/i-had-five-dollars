import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import firebaseConfig from "../../firebase"
import './SignUp.css'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const redirect = ()=> {
    history.push("/login");
  };

  return (
    <div className="signUpContainer">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <button onClick={redirect}>Log in</button>
    </div>
  );
};

export default withRouter(SignUp)
