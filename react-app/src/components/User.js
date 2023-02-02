import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditService from './EditServiceModal/'
import OpenModalButton from './OpenModalButton'
import { deleteAService } from '../store/service';
import {getAllServices} from '../store/service'
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const allServicesObj = useSelector(state => state.services.allServices)
  const allServices = Object.values(allServicesObj)
  const sessionUserObj = useSelector(state => state.session.user)
  const sessionUser = Object.values(sessionUserObj)
  // console.log('user', user)
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);
  useEffect(() => {
    dispatch(getAllServices())
}, [dispatch])

  if (!user) {
    return null;
  }
  // if(!allServices.length){
  //   return null
  // }
  if(!sessionUser.length){
    return null
  }
  const userServices = allServices.filter(service => service.user_id === Number(userId))
  console.log('user', userServices)

  let message = ''
  const handleDeletion = async (serviceId) => {

    const response = await dispatch(deleteAService(serviceId))
    alert('Deleted Successfully!')

    if (response) {
      message = response.message
    }
    history.push(`/users/${userId}`)

  }

  return (
    <div id='profile-page-container'>
      <div id='profile-page-profile-info'>
          <div>
            <img src={user.profile_photo}  id='profile-page-photo'/>
          </div>
          <div id='profile-info-profile-page'>
            <div id='profile-page-username'>
               {user.username}
            </div>
            <div id='profile-page-email'>
               {user.email}
            </div>
            <div id='profile-page-balance'>
              Balance:  ${user.balance}
            </div>
          </div>
      </div>
      <div id='all-services-profile-page'>
        <div id='service-title-profile-page'>Services you provide</div>
        {userServices.map(service => (
        <div className='service-info-profile'>
        <NavLink
        to={`/services/${service.id}`}
        id='service-navlink-profile'
        style={{ textDecoration: 'none' }}
        >
          <img src={service.thumbnail} className='profile-page-thumbnail'
          onError={e => {e.target.src = 'https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2021/03/CDG_blog_post_image_02-2.jpg'}}
          />
          <div id='service-title-profile'>{service.title}</div>
          <div id='service-description-profile'>{service.description}</div>
          <div id='price-details-profile'>
          <div id='profile-price-label'>Price: </div>
          <div id='service-price-profile'> ${service.price}</div>
          </div>
        </NavLink>
        {/* { sessionUserObj.id === service.user_id && */}
        <div id='buttons-profile'>
          <div id='edit-service-button-profile'>
            <OpenModalButton
            buttonText='Edit Service'
            modalComponent={<EditService serviceId ={ `${service.id}`} />}
            />
          </div>
          <div id='delete-service-div-profile'>
        <button onClick={() => handleDeletion(service.id)} id='delete-service-profile'>Delete Service</button>
        </div>
        </div>
        {/* } */}

        </div>

      ))}</div>
    </div>
  );
}
export default User;
