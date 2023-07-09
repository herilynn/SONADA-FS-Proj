import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../store/group";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./AllGroups.css"

// function CreateGroup() {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [errors, setErrors] = useState([]);
const AllGroups = () => {
const history = useHistory()
const dispatch = useDispatch()
const sessionUser = useSelector((state) => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(fetchGroups())
    history.replace("/groups")
  };

  if (!sessionUser) {
    return null;
  }
  return (
    <button onClick={handleSubmit} className="All_Groups">All Groups</button>
    )
  };


export default AllGroups;
