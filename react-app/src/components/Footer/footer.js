import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom';
// import gitHubLogo from '../Images/GitHub_Logo_White.png'
import gitHubCat from '../Images/github-mark-white.png'
import linkedInLogo from '../Images/In-White-34.png'


const Footer = () => {

  return(
    <div className='main-footer'>

        <div className='footer-row'>
            <div id='footer-col1'>

              <div id='dev-name'>Anthony Vithayathil</div>

                <a
                href='https://github.com/AntVith' target="_blank">
                <img src={gitHubCat}  id='github-cat-logo'/>
                </a>

                <a
                href='https://www.linkedin.com/in/anthony-vithayathil-2256bb136/' target="_blank">
                <img src={linkedInLogo} id='linked-in-logo'/>
                </a>

            </div>

        </div>

    </div>
  )
}




export default Footer;
