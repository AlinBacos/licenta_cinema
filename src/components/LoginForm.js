import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { useNavigate } from "react-router-dom";
import "./components_style/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    let valid = true;
    if (!email) {
      valid = false;
      setEmailError("Email cannot be null");
    }
    if (!password) {
      valid = false;
      setPasswordError("Password cannot be null");
    }
    if (valid) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/Schedule");
        })
        .catch((error) => {
          console.log(error);
          setEmailError("Please verify the data provided is valid");
          setPasswordError("Please verify the data provided is valid");
        });
    } else {
      return;
    }
  };

  return (
    <div className="login-component">
      <div className="login-form">
        <div className="wrap">
          <h1 align="center">Login Form</h1>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={emailError ? "errorEmail" : ""}
            title={emailError}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className={passwordError ? "errorPassword" : ""}
            title={passwordError}
          />
          <button onClick={signIn} type="submit">
            Login
          </button>
          <a href="/Register">
            <h4>Don't have an account?Register here.</h4>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
