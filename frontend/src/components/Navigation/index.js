import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/SearchBar';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <SearchBar/> */}
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
      {/* <li className='search-bar'></li> */}
      <div className='div_outer'>
        
        <div className = "logo">
          <NavLink exact to="/">Sonada</NavLink>
          <SearchBar/>
        </div>

        {/* <div className='search_div'> */}
          
        {/* </div> */}
        <div className = 'session_div'>
          {sessionLinks}
        </div>
      </div>
    </>
  );
}

export default Navigation;