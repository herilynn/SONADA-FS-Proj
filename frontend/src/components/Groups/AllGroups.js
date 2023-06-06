import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../../store/group";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// function CreateGroup() {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [errors, setErrors] = useState([]);
const AllGroups = () => {
const history = useHistory()
const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(fetchGroups())
    history.replace("/groups")
  };
  return (
    <button onClick={handleSubmit}>All Groups</button>
    )
  };


export default AllGroups;
