
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
    <nav className='navbar'>
      <div id='navbar-contents'>
        <div id='whole-title' >
          <NavLink
           to='/' exact={true} activeClassName='active'
           style={{ textDecoration: 'none' }}
           id='site-title'>
            Striverr
          <div id='title-period'>.</div>
          </NavLink>

        </div>
        <div className='right-side-contents'>

        <div className='navbar-buttons'>
        <OpenModalButton
            buttonText='Striverr Business'

            modalComponent={<UploadNewService />}
            />
        </div>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/orders`} exact={true} activeClassName='active'
          // className='navbar-buttons'
          id='order-navlink'
          >
            Orders
          </NavLink>

        <div className='navbar-buttons' >
          <LogoutButton id='logout-button'/>
        </div>
        <div>
          <NavLink
          style={{ textDecoration: 'none' }}
          to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'
          >
            <img  id='user-page-image' src='https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg'></img>
          </NavLink>
        </div>
        </div>
      </div>
    </nav>
    </>
    )
  }else{
    sessionLinks = (
      <>
    <nav className='navbar'>
      <div id='navbar-contents'>
      <div id='whole-title' >
          <NavLink
           to='/' exact={true} activeClassName='active'
           style={{ textDecoration: 'none' }}
           id='site-title'>
            Striverr
          <div id='title-period'>.</div>
          </NavLink>

        </div>
        <div className='right-side-contents-logged-out'>
        <div >
        <OpenModalButton
            buttonText='Sign In'
            modalComponent={<LogIn />}
            />
        </div>
        <div>
        <OpenModalButton
            buttonText='Join'
            modalComponent={<SignUp />}
            />
        </div>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        {/* <div>
          <LogoutButton />
        </div> */}
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
