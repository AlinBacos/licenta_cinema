import React from 'react'
import "./components_style/RegisterForm.css"

function RegisterForm() {
  return (
    <div className="register-component">
      <div className="register-form">
        <form>
            <label>First Name</label><br/>
            <input type="text" placeholder="Enter your First Name"></input><br/>
            <label>Last Name</label><br/>
            <input type="text" placeholder="Enter your Last Name"></input><br/>
            <label>Email</label><br/>
            <input type="text" placeholder="Enter your Email"></input><br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Choose your Password"></input><br/>
            <label>Confirm Password</label><br/>
            <input type="password" placeholder="Confirm your Password"></input><br/>
            <input type="button" value="Register"></input><br/>
            <a href="/Login"><h4>Already have an account?Login now!</h4></a>
        </form>
    </div>
    </div>
  )
}

export default RegisterForm