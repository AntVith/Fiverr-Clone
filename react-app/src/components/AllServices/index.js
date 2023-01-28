import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllServices} from '../../store/service'
import './allServices.css'
function AllServices() {
    const dispatch = useDispatch()
    const servicesObj = useSelector(state => state.services.allServices)
    const services = Object.values(servicesObj)
    const totalServices = services.length
    const [users, setUsers] = useState([]);
    useEffect(() => {
       dispatch(getAllServices())
       async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, [dispatch])



        if(!services.length){
            return null
        }
        if(!users.length){
            return null
        }
        console.log('users', users)
        function userNameFinder(id) {
            const usersFound = users.filter(user => user.id === id)
            const usernameFound = usersFound[0].username
            return usernameFound
          }
        function profilePhotoFinder(id) {
            const usersFound = users.filter(user => user.id === id)
            const photoFound = usersFound[0].profile_photo
            return photoFound
          }



    return (
        <div id='service-container'>
            <div id='all-services'>
            {services.map(service => (

                <NavLink
                to={`/services/${service.id}`}
                style={{ textDecoration: 'none' }}
                >
                    <div id='service-details'>
                        <img src={service.thumbnail} id='service-image-homepage' />
                        <div id='homepage-service-details'>
                            <div id='profile-line-card'>
                                <img src={profilePhotoFinder(service.user_id)} id='profile-photo-homepage'/>
                                <div id='homepage-username'>{userNameFinder(service.user_id)}</div>
                            </div>
                            <div id='homepage-title'>{service.title}</div>
                            {/* <div id='homepage-description'>{service.description}</div> */}
                            <div id='price-line'>
                            <div id='price-label'>Starting At</div>
                            <div id='homepage-price'>  ${service.price}</div>
                            </div>
                        </div>

                    </div>
                </NavLink>

            ))}
            </div>
        </div>
    )
}

export default AllServices;
