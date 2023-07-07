import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {Link} from "react-router-dom";


function firstInitial(user) {
  return user.name.charAt(0).toUpperCase();
}

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="testing">
      <button onClick={openMenu} className="logoutButton">
        <i className="fa-solid fa-user-circle" />
        {firstInitial(user)}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <button type = 'submit' className="your_events">Your events</button>
          <button type = 'submit' className="your_groups">Your groups</button>
          <button type = 'submit' className="your_profile">View profile</button>
          <button type = 'submit' className="settings_button">Settings</button>
          <button type = 'submit' className="help_button">Help</button> */}
          <li>
            <button onClick={logout} className="logout">Log out</button>
          </li>
        </ul>
  
      )}
    </div>
    </>
  );
}

export default ProfileButton;