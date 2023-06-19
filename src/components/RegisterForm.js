import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./components_style/RegisterForm.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setHidden(true);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyError = (e) => {
    if (password.length <= 9) {
      setError(true);
    } else if (!email.includes("@")) {
      setError(true);
    } else if (!email.includes(".com")) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const register = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Invalid email format");
    }

    if (email.includes("@admin.com")) {
      setEmailError("Email domain not allowed");
    }

    if (password.length < 10) {
      setPasswordError("Password should be at least 10 characters long");
    }

    if (passwordError || emailError) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-component">
      <div className="register-form">
        <div className="register-form-form">
          <h1 align="center">Register Form</h1>
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
          {(emailError || passwordError) && (
            <span textAlign="center">Verifiy error message and try again</span>
          )}
          <button onClick={register}>Register</button>
          <a href="/Login">
            <h4>Already have an account?Login now!</h4>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
