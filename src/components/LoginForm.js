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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/Schedule");
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
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
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
