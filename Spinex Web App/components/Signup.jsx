import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/LoginStyle.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUwegjyF5ks0Mk5gFRo9REWpk2K7bwf14",
  authDomain: "spinex-5dc42.firebaseapp.com",
  databaseURL: "https://spinex-5dc42-default-rtdb.firebaseio.com",
  projectId: "spinex-5dc42",
  storageBucket: "spinex-5dc42.appspot.com",
  messagingSenderId: "532620761987",
  appId: "1:532620761987:web:0691dd2b1342dbeb89f4b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const Signup = ({ onNavigate, onLogin }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store user details in Firebase Realtime Database
        set(ref(database, "users/" + user.uid), {
          name: name,
          username: username,
          email: email,
        });

        alert("User registered successfully!");
        onNavigate();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <span className="login-close-icon">
        <i className="bx bx-x"></i>
      </span>
      <div className="login-form-box">
        <h1>Registration</h1>
        <form onSubmit={handleSignup}>
          <div className="login-input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="login-input-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="login-input-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className="login-input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="login-remember-forgot">
            <label>
              <input type="checkbox" />I agree to the terms & conditions
            </label>
          </div>
          <button type="submit" className="login-btn">
            Register
          </button>
          <div className="login-register-link">
            <p>
              Already have an account? <button onClick={onLogin}>Login</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
