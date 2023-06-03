import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./loggedOutScreen.css";
import {Link} from "react-router-dom";

const Hello = () => {
  return (
    <h1> 
      "Hello world"
    </h1>
  )
}

export default Hello