import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
const auth = getAuth(app);

const Login = ({onNavigate, onRegister}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User logged in successfully!");
        onNavigate();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login-container">
      <span className="login-close-icon">
        <i className="bx bx-x"></i>
      </span>
      <div className="login-form-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="login-input-box">
            <input
              type="text"
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
              <input type="checkbox" /> I agree to the terms & conditions
            </label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <div className="login-register-link">
            <p>
              Do not have an account?{" "}
              <button type="button" onClick={onRegister}>
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
