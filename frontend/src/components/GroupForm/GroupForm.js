import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as groupActions from "../../store/group";
import { createGroup } from "../../store/group";
import "./GroupForm.css";
import "../Navigation/Navigation.css";

function GroupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (
      location.length > 1 &&
      name.length > 6 &&
      description.length > 0 &&
      description.length < 500
    ) {
      const group = {
        location: location,
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
      };
      return dispatch(createGroup(group)).catch(async (res) => {
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
    } else {
      if (location.length < 2) {
        setErrors((prev) => [
          ...prev,
          "Location must be at least 2 characters",
        ]);
      }

      if (name.length < 6) {
        setErrors((prev) => [...prev, "Name must be at least 6 characters"]);
      }
      if (description.length === 0 || description.length > 500) {
        setErrors((prev) => [
          ...prev,
          "Description must be more than 0 characters and less than 500 characters",
        ]);
      }
      if (latitude < -90 || latitude > 90) {
        setErrors((prev) => [
          ...prev,
          "Not a valid latitude coordinate",
        ]);
      }  
      if (longitude < -180 || longitude > 180) {
          setErrors((prev) => [
            ...prev,
            "Not a valid longitude coordinate",
        ]);
      }
    }
  };
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  // };

  return (
    <div className="modal-container">
      <div className="modal">
        <h1 className="Form-header">Start a Group</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <ul className="signupErrors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <label className="SU-label">
            Set the location of your group
            <input
              className="SU-input"
              type="text"
              value={location}
              style={{ width: "300px", height: "30px" }}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            Latitude
            <input
              className="SU-input"
              type="number"
              value={latitude}
              style={{ width: "300px", height: "30px" }}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              required
            />
          </label>
          <label className="SU-label">
            Longitude
            <input
              className="SU-input"
              type="number"
              value={longitude}
              style={{ width: "300px", height: "30px" }}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              required
            />
          </label>
          <label className="SU-label">
            {/* Name your group */}
            <label className="name-desc">
              Choose your name as carefully as if you're naming your 2nd born
            </label>
            <input
              className="SU-input"
              type="text"
              value={name}
              style={{ width: "300px", height: "30px" }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            {/* Describe your group */}
            <label>
              Give potential potatoes an idea of what they're getting into but
              not so much they won't give it a shot (kind of like a dating
              profile)
            </label>
            <textarea
              className="SU-input"
              // type="text"
              value={description}
              style={{ width: "300px", height: "150px" }}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <button className="createGroupButton" onClick={handleSubmit}>
            Start a new Group
          </button>
        </form>
        <img
          src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"
          className="default3"
        />
      </div>
    </div>
  );
}

export default GroupForm;
