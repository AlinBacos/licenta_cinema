import React from 'react'
import "./components_style/LoginForm.css"
import {auth} from '../database/firebase'
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

function LoginForm() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[user, setUser] = useState([]);

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  })

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const signIn = async() =>{
    await signInWithEmailAndPassword(auth,email,password).then(()=>{
      setEmail("");
      setPassword("");
    })
  }

  const register = async() =>{
    await createUserWithEmailAndPassword(auth,email,password).catch((error) =>
    console.log(error.message)
    )
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login-component">
      <div className="login-form">
        <form>
            <label>Email</label><br/>
            <input type="email" value={email} onChange= {handleEmailChange} placeholder="Enter your email"></input><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange= {handlePasswordChange} placeholder="Enter your password"></input><br/>
            <button onClick={signIn}>Login</button><br/>
            <button onClick={register}>Register</button><br/>
            <a href="/Register"><h4>Don't have an account?Register here.</h4></a>
        </form>
    </div>
    </div>
  )
}

export default LoginForm