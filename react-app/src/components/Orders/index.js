import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getUserBookings} from '../../store/booking'
import './Orders.css'

function UserOrders(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const bookingsObj = useSelector(state => state.bookings.bookings)
    const allServicesObj = useSelector(state => state.services.allServices)


    const bookings = Object.values(bookingsObj)
    const allServices = Object.values(allServicesObj)

    useEffect(() => {
        dispatch(getUserBookings(sessionUser.id))
    }, [dispatch])


    if(!bookingsObj || !allServicesObj){
       return null
    }
    if(!allServices.length){
        return null
    }
    function serviceTitleFinder(id){
       const serviceArr = allServices.filter(data => data.id === id)
       const service = serviceArr[0]
       return service.title
    }
    function serviceImageFinder(id){
       const serviceArr = allServices.filter(data => data.id === id)
       const service = serviceArr[0]
       return service.thumbnail
    }
    function servicePriceFinder(id){
    const serviceArr = allServices.filter(data => data.id === id)
    const service = serviceArr[0]
    return service.price
    }
    return (
        <div id='all-bookings'>
        <div  id='service-container'>
            <div id='all-services'>
            {bookings.map(booking => (
                <NavLink
                to={`/services/${booking.service_id}`}
                style={{ textDecoration: 'none' }}
                >
                    <div id='service-details'>
                        <div id='homepage-service-details'>
                            <img src={serviceImageFinder(booking.service_id)} id='service-image-homepage' />
                            <div id='homepage-title'>{serviceTitleFinder(booking.service_id)}</div>
                            <div id='price-line'>
                            <div id='price-label'>Price paid: </div>
                            <div id='homepage-price'>{servicePriceFinder(booking.service_id)} </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
            </div>

        </div>
        </div>
    )
}
export default UserOrders
