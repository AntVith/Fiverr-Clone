import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllServices} from '../../store/service'

function AllServices() {
    const dispatch = useDispatch()
    const servicesObj = useSelector(state => state.services.allServices)
    const services = Object.values(servicesObj)
    const totalServices = services.length

    useEffect(() => {
       dispatch(getAllServices())
    }, [dispatch, totalServices])


if(!services.length){
    return null
}

    return (
        <div id='service-container'>
            <div id='all-services'>
            {services.map(service => (
                <ul>
                <NavLink
                to={`/services/${service.id}`}>
                    {service.title}
                    {service.description}
                </NavLink>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default AllServices;
