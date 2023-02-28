import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {getUserBookings} from '../../store/booking'
import {deleteABooking} from '../../store/booking'
import OpenModalButton from '../OpenModalButton'
import EditBookingModal from '../EditBookingModal';
import {getAllServices} from '../../store/service'
import './Orders.css'

function UserOrders(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const bookingsObj = useSelector(state => state.bookings.bookings)
    const allServicesObj = useSelector(state => state.services.allServices)
    const history = useHistory()

    const bookings = Object.values(bookingsObj)
    const allServices = Object.values(allServicesObj)

    useEffect(() => {
        dispatch(getUserBookings(sessionUser.id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])


    let message = ''
    const handleDeletion = async (bookingId, serviceId) => {


        const deletedBooking = await dispatch(deleteABooking(bookingId))
        alert('Canceled Successfully!')
        if(deletedBooking){
            message = deletedBooking.message
        }
        history.push(`/review/${serviceId}`)


    }


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
        <div id='orders-title-for-page'> Services you've booked</div>
            <div id='all-services'>
            {bookings.map(booking => (
                <div id='individual-booking-card'>
                <NavLink
                to={`/services/${booking.service_id}`}
                style={{ textDecoration: 'none' }}
                id='booking-navlink'
                >
                    <div id='service-details-booking'>
                        <div id='booking-service-details'>
                            <img src={serviceImageFinder(booking.service_id)} id='service-image-homepage'
                            onError={e => {e.target.src = 'https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2021/03/CDG_blog_post_image_02-2.jpg'}} />
                            <div id='booking-title'>{serviceTitleFinder(booking.service_id)}</div>
                            <div id='instructions-portion'>
                                <div id='instructions-label'>Instructions you've given:</div>
                                <div id='service-instructions'>{booking.instructions}</div>

                            </div>
                            <div id='price-line-orders'>
                            <div id='price-label'>Price paid: </div>
                            <div id='homepage-price'>${servicePriceFinder(booking.service_id)} </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <div id='button-booking-details'>
                <OpenModalButton
                buttonText='Edit Instructions'

                modalComponent={<EditBookingModal bookingId={`${booking.id}`} />}
                />
                <button onClick={ () => handleDeletion(booking.id, booking.service_id)} id='cancel-service-button'> Cancel Service</button>
                </div>
                </div>
            ))}
            </div>

        </div>
        </div>
    )
}
export default UserOrders
