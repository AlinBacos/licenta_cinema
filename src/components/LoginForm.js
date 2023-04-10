import React from 'react'
import "./components_style/LoginForm.css"

function LoginForm() {
  return (
    <div className="login-component">
      <div className="login-form">
        <form>
            <label>Email</label><br/>
            <input type="text" placeholder="Enter your email"></input><br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter your password"></input><br/>
            <input type="button" value="Login"></input><br/>
            <a href="/Register"><h4>Don't have an account?Register here.</h4></a>
        </form>
    </div>
    </div>
  )
}

export default LoginForm