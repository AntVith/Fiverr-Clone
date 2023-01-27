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

    return (
        <div id='service-container'>
            <div id='all-services'>
            {services.map(service => (
                <ul>
                <NavLink
                to={`/services/${service.id}`}>
                    <div id='service-details'>
                        <img src={service.thumbnail} id='service-image-homepage' />
                        <div>{userNameFinder(service.user_id)}</div>
                        <div>{service.title}</div>
                        <div>{service.description}</div>
                        <div>${service.price}</div>

                    </div>
                </NavLink>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default AllServices;
