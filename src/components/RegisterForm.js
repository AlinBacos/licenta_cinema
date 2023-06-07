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
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="register-component">
      <div className="register-form">
        <div className="register-form-form" onChange={verifyError}>
          <h1 align="center">Register Form</h1>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          {error && !email.includes(".com") ? (
            <label id="error">
              ! Email must contain "@", ".com" and cannot be NULL!
            </label>
          ) : (
            ""
          )}
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          {error && password.length <= 10 ? (
            <label id="error">
              ! Password must be at least 10 characters long and cannot be NULL!
            </label>
          ) : (
            ""
          )}
          <button onClick={register} disabled={error}>
            Register
          </button>
          <a href="/Login">
            <h4>Already have an account?Login now!</h4>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
