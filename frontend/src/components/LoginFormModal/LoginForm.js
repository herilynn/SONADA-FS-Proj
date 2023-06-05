import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import {Link} from "react-router-dom";
import SignupForm from "../SignupFormModal";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignupButton = () => {
    setShowSignupModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await JSON.parse(res.message);
        } catch {
          data = await res.message;
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });

    // const makeSignupModal = () => {
      
  };

  return (
    <div className="modal-container">
      <div className = "modal">
        {showSignupModal ? (
          <SignupForm/>
        ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="LI-header">Log in</h1>
          <p className="LI-ptag">Not a member yet? <button className = "teal-link" onClick={handleSignupButton}>Sign Up</button></p>
          <ul className="loginErrors">
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label className="LI-label">
            Email
            <input className="LI-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="LI-label">
            Password
            <input className="LI-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className = "LI-button">Log In</button>

          <div className="demo-user-container">
            {/* <label className="Demo-User"></label> */}
            <button className="demo" type="submit" onClick={() => { setEmail("demo@gmail.com"); setPassword("password"); }}>John Demo</button>
          </div>
        </form>
        )}
      </div>
      {showSignupModal && <SignupForm />}
    </div>
  );
}

export default LoginForm;
