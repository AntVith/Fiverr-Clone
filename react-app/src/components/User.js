import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditService from './EditServiceModal/'
import OpenModalButton from './OpenModalButton'
import { deleteAService } from '../store/service';

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

  if (!user) {
    return null;
  }
  if(!allServices.length){
    return null
  }
  if(!sessionUser.length){
    return null
  }
  const userServices = allServices.filter(service => service.user_id === Number(userId))
  console.log('user', userServices)

  let message = ''
  const handleDeletion = async (serviceId) => {
    const response = await dispatch(deleteAService(serviceId))
    if (response) {
      message = response.message
    }
    history.push(`/users/${userId}`)

  }

  return (
    <div>
      <div>
        <strong>User Id</strong> {userId}
      </div>
      <div>
        <strong>Username</strong> {user.username}
      </div>
      <div>
        <strong>Email</strong> {user.email}
      </div>
      <div>{userServices.map(service => (
        <div>
        <NavLink
        to={`/services/${service.id}`}>
          <img src={service.thumbnail}/>
          {service.title}
          {service.description}
          {service.price}
          <div> space </div>
        </NavLink>
        { sessionUserObj.id === service.user_id &&
        <div>
        <OpenModalButton
        buttonText='Edit Service'
        modalComponent={<EditService serviceId ={ `${service.id}`} />}
        />
        <button onClick={() => handleDeletion(service.id)}>Delete</button>
        </div>
        }

        </div>

      ))}</div>
    </div>
  );
}
export default User;
