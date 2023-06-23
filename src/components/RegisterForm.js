import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./components_style/RegisterForm.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(false);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  useEffect(() => {
    setHidden(true);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const register = async () => {
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Invalid email format");
      valid = false;
    }

    if (email.includes("@admin.com")) {
      setEmailError("Email domain not allowed");
      valid = false;
    }

    if (password.length < 10) {
      setPasswordError("Password should be at least 10 characters long");
      valid = false;
    }

    if (!(password === verifyPassword)) {
      setVerifyPasswordError("The password you introduced does not match");
      valid = false;
    }

    if (!valid) {
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/Login");
      } catch (error) {
        console.log(error);
      }
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
          <label>Verify Password</label>
          <input
            type="password"
            value={verifyPassword}
            onChange={handleVerifyPasswordChange}
            placeholder="Verify your password"
            className={verifyPasswordError ? "errorVerifyPassword" : ""}
            title={verifyPasswordError}
          />
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
