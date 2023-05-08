import React from 'react'
import "./components_style/RegisterForm.css"
import {auth} from '../database/firebase'
import {useState, useEffect} from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const verifyError = (e) =>{
    if(password.length<11){
      setError(true);
    }
    else if(!email.includes('@')){
      setError(true);
    }
    else if(!email.includes('.com')){
      setError(true);
    }
    else{
      setError(false);
    }
  }

  const register = async() =>{
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      navigate("Login");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <div className="register-component">
      <div className="register-form">
        <form onChange={verifyError}>
            <label>Email</label><br/>
            <input type="email" value={email} onChange= {handleEmailChange} placeholder="Enter your email"></input><br/>
            {error && !email.includes('.com')?
            <label id="error">Email must contain "@", ".com" and cannot be NULL!</label>:""}
            <label>Password</label><br/>
            <input type="password" value={password} onChange= {handlePasswordChange} placeholder="Enter your password"></input><br/>
            {error&&password.length<=10?
            <label id="error">Password must be at least 10 characters long and cannot be NULL!</label>:""}
            <button onClick={register} disabled={error}>Register</button><br/>
            <a href="/Login"><h4>Already have an account?Login now!</h4></a>
        </form>
    </div>
    </div>
  )
}

export default RegisterForm