import React from 'react'
import "./components_style/LoginForm.css"
import {auth} from '../database/firebase'
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      console.log("user set");
      setUser(user);
    })
  },[])

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const signIn = async() =>{
    console.log("Sokdfaoksdoas");
    await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    navigate("Register");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    <div className="login-component">
      <div className="login-form">
        <form>
            <label>Email</label><br/>
            <input type="email" value={email} onChange= {handleEmailChange} placeholder="Enter your email"></input><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange= {handlePasswordChange} placeholder="Enter your password"></input><br/>
            <button onClick={signIn} type="submit">Login</button><br/>
            <a href="/Register"><h4>Don't have an account?Register here.</h4></a>
        </form>
    </div>
    </div>
  )
}

export default LoginForm