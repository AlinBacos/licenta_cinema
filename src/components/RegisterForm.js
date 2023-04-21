import React from 'react'
import "./components_style/RegisterForm.css"
import {auth} from '../database/firebase'
import {useState, useEffect} from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();


  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
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
        <form>
            <label>Email</label><br/>
            <input type="email" value={email} onChange= {handleEmailChange} placeholder="Enter your email"></input><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange= {handlePasswordChange} placeholder="Enter your password"></input><br/>
            <button onClick={register}>Register</button><br/>
            <a href="/Login"><h4>Already have an account?Login now!</h4></a>
        </form>
    </div>
    </div>
  )
}

export default RegisterForm