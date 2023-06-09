import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import * as groupActions from "../../store/group";
import { updateGroup, getGroup, deleteGroup } from "../../store/group";
import "./UpdateGroup.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function UpdateGroupForm() {
  const {groupId} = useParams()
  const group = useSelector(getGroup(groupId))
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState(group.name || "");
  const [description, setDescription] = useState(group.description || "");
  const [location, setLocation] = useState(group.location || "");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (name.length > 6 && description.length > 0 && description.length < 250)  {
      const updatedGroup = {...group, location: location, name: name, description: description}
      return dispatch(updateGroup(updatedGroup))
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
    else {

      if (location.length < 2) {
        setErrors(prev => ([...prev, "Location must be at least 2 characters"]))
      }

      if (name.length < 6) {
        setErrors(prev => ([...prev, "Name must be at least 6 characters"]))
      }
      if (description.length === 0 || description.length > 500) {
        setErrors(prev => ([...prev, "Description must be more than 0 characters and less than 500 characters"]))
      }

      
      }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteGroup(groupId)).then(
      async (res) => {
          history.replace("/home");
      }
    )
  }
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  // };

  return (
    <div className="modal-container">
      <div className = "modal">
        <h1 className="Form-header">Update Group</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <ul className="signupErrors">
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <label className="SU-label">
            Set the location of your group
            <input className = 'SU-input'
              type="text"
              // placeholder="empty"
              value={location}
              style={{ width: '300px', height: '30px' }}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            {/* Name your group */}
            <label className="name-desc">
              Choose your name as carefully as if you're naming your 2nd born
            </label>
            <input className = 'SU-input'
              type="text"
              // placeholder="empty"
              value={name}
              style={{ width: '300px', height: '30px' }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="SU-label">
            {/* Describe your group */}
            <label>
              Give potential potatoes an idea of what they're getting into but not so 
              much they won't give it a shot (kind of like a dating profile)
            </label> 
            <textarea className = 'SU-input'
              type="text"
              // placeholder="empty"
              value={description}
              style={{ width: '300px', height: '150px' }}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          
          <button className = "updateGroupButton" onClick={handleSubmit}>Save Changes</button>
          <button className="deleteGroupButton" onClick={handleDelete}>Delete Group</button>
        </form>
        <img src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640" className='default4'/>
        </div>
    </div>
  );

}

export default UpdateGroupForm;