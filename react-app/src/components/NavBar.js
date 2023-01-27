
import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import OpenModalButton from './OpenModalButton'
import UploadNewService from './PostServiceModal'
import LogIn from './LogInModal'
import SignUp from './SignUpModal';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if(sessionUser){
    sessionLinks = (
    <>
    <nav>
      <div id='navbar-contents'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
        <OpenModalButton
            buttonText='Post Your Service'
            modalComponent={<UploadNewService />}
            />
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
    </>
    )
  }else{
    sessionLinks = (
      <>
    <nav>
      <div id='navbar-contents'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
        <OpenModalButton
            buttonText='Log In'
            modalComponent={<LogIn />}
            />
        </div>
        <div>
        <OpenModalButton
            buttonText='Sign Up'
            modalComponent={<SignUp />}
            />
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
    </>
    )
    }
  return (
    <div>
      {sessionLinks}
    </div>
  );
}

export default NavBar;
