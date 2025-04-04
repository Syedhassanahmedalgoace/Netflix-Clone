import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  return (
    <div className="login">
      <img src={logo} className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input type="text" placeholder="Enter Your Name" />
          )}
          <input type="email" placeholder="Enter Your Email" />
          <input type="password" placeholder="Enter Your Password" />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign up Now</span>
            </p>
          ) : (
            <p>
              Already have an Account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
