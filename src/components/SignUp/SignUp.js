import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import firebaseConfig from "../../firebase"
import firebase from 'firebase'
import defaultAvatar from '../../assets/default-avatar.jpg'
import './SignUp.css'



const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, userName } = event.target.elements;
    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        let user = firebase.auth().currentUser;
        writeUserData(user.uid, userName.value, email.value)
        console.log(user)
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const redirect = () => {
    history.push("/login");
  };

  function writeUserData(userID, name, email) {
    const userRef = firebase.database().ref('users/')
    let users = {}
    //Check for duplicate usernames
    // userRef.on('value',snapshot => snapshot.forEach(snapshot => {
    //   if(snapshot.child('username')===name){
    //     return alert()
    //   }
    // }))
    //
    userRef.once('value',snapshot=> {
      users = {...snapshot.val()}
      users[userID]= {
        username: name,
        email: email,
        //might not need this
        createdAt: firebase.database.ServerValue.TIMESTAMP
      }
      userRef.set(users)
    })
    // .push({
    //   userID: userID,
    //   username: name,
    //   email: email,
    // });
  }

  return (
    <div className="signUpContainer">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <input name="userName" type="userName" placeholder="User Name" />
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
        <p>Already have an account?</p>
        <button onClick={redirect}>Log in</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp)
