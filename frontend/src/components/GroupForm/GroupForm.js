import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as groupActions from "../../store/group";
import { createGroup } from "../../store/group";
import './GroupForm.css';

function GroupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 6 && description.length > 0 && description.length < 50)  {
      setErrors([]);
      const group = {location: location, name: name, description: description}
      return dispatch(createGroup(group))
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
    }
  }
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  // };

  return (
    <div className="modal-container">
      <div className = "modal">
        <h1 className="Form-header">Start a Group</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <ul className="signupErrors">
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <label className="SU-label">
            Set the location of your group
            <input className = 'SU-input'
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            Name your group
            <label className="name-desc">
              Choose your name as carefully as if you're naming your 2nd born
            </label>
            <input className = 'SU-input'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            Describe your group
            <label>
              Give potential potatoes an idea of what they're getting into but not so 
              much they won't give it a shot (kind of like a dating profile)
            </label> 
            <input className = 'SU-input'
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          
          <button className = "createGroupButton" onClick={handleSubmit}>Start a new Group</button>
        </form>
        </div>
    </div>
  );

}

export default GroupForm;