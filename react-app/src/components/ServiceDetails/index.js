import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {getServiceDetails} from '../../store/service'
import { postABooking } from '../../store/booking';
import {editAUserBalance} from '../../store/session'
import {getAllServices} from '../../store/service'
import { getReviews } from '../../store/review';
import './ServiceDetails.css'
function ServiceDetails(){
    const {serviceId} = useParams()
    const dispatch = useDispatch()
    const serviceDetails = useSelector(state => state.services.serviceDetails)
    const serviceDetailsData = Object.values(serviceDetails)
    const [users, setUsers] = useState([]);
    const [instructions, setInstructions] = useState('')
    const [bookings, setBookings] = useState([])
    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.reviews)
    const reviews = Object.values(reviewsObj)
    const history = useHistory()

    useEffect(() => {
        dispatch(getServiceDetails(serviceId))
        dispatch(getReviews(serviceId))
            async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();
          async function fetchBookings() {
            const response = await fetch(`/api/booking/service/${serviceId}`);
            const responseData = await response.json();
            setBookings(responseData.bookings);
          }
          fetchBookings();
    }, [dispatch, serviceId])
    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])



    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log('in handle')
        const formData = {
            "user_id": sessionUser.id,
            "service_id": serviceDetails.id,
            instructions
        }
        const bookedService = await dispatch(postABooking(formData, serviceDetails.id))
        console.log('after dispatch')
        if(bookedService){
            const balance = sessionUser.balance - serviceDetails.price
            const userId = sessionUser.id
            const newBalance = {
                balance
            }
            const adjustedBalance = await dispatch(editAUserBalance(newBalance, userId))
            history.push(`/orders`)
        }
    }

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
    console.log('bookings', bookings)
    const serviceOwnerArray = users.filter(user => user.id === serviceDetails.user_id)
    const serviceOwner = serviceOwnerArray[0]

    // console.log('owner', serviceOwner)


    if(!serviceDetailsData.length || !serviceOwnerArray.length ){
        return null
    }
    const alreadyBookedByUser = bookings.filter(booking => booking.user_id === sessionUser?.id)
    console.log('booked', alreadyBookedByUser)

    function validationChecker(){

        if(!sessionUser){
            return <div id='not-enough-money'> Please log in or sign up to book!</div>
        }
        else if(serviceDetails.user_id === sessionUser.id){
            return <div id='not-enough-money'> Can't book your own service! </div>
        }
        else if(alreadyBookedByUser.length){
            return <div id='not-enough-money'> Already booked this service! </div>
        }
        else if((sessionUser.balance - serviceDetails.price) <0){
            return <div id='not-enough-money'> Please add funds to your balance to book! </div>
        } else{
            return <button
            className='booking-Inputs'
            type="submit"
            id='submit-booking'
               >Order</button>
        }
    }
    // function enoughMoney(){
    //     console.log('in money',(sessionUser.balance - serviceDetails.price) )
    //     if((sessionUser.balance - serviceDetails.price) >0){
    //         return true
    //     } else{
    //         return false
    //     }
    // }
    console.log('reviews', reviews)
    return (
        <div id='whole-details-page'>
        <div id='details-side'>
            <div id='above-image-details'>
                <div className='details-title'>{serviceDetails.title}</div>
                <div id='profile-line-card'>
                    <img src={profilePhotoFinder(serviceDetails.user_id)} id='profile-photo-details-page'/>
                    <div id='details-page-username'>{userNameFinder(serviceDetails.user_id)}</div>
                    <div id='statement-details'>Top Rated Seller</div>
                </div>
            </div>
            <img
            className='details-image'
            src={serviceDetails.thumbnail}
            onError={e => {e.target.src = 'https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2021/03/CDG_blog_post_image_02-2.jpg'}} />
            <div id='details-description'>
                <div id='Details-description-title'>About This Gig</div>
                <div id='details-description-info'>{serviceDetails.description}</div>
            </div>

            <div id='reviews-div'>
                <div id='Reviews-title'>Reviews</div>
                {reviews.map(review => (
                    <div className='reviewBlock'>
                        <div> {review.review} </div>
                        <div> {review.stars} </div>
                    </div>
                ))}

            </div>

            <div>
                <div id='details-user-title'>About The Seller</div>
                <div id='details-user-photo-and-username'>
                    <img src={profilePhotoFinder(serviceDetails.user_id)} id='profile-photo-2-details-page'/>
                    <div><div id='details-username'>{serviceOwner.username}</div>
                    <div id='details-user-bio'>{serviceOwner.bio}</div>
                    </div>
                </div>

            </div>
        </div>
            <div id='bookings-side'>
                <div id='booking-post'>
                     <label id='booking-label'>Book This Service</label>
                     { sessionUser &&
                     <div id='user-balance'>
                        <div id='user-balance-label'>Your Balance :</div>
                         <div id='user-balance-amount'> ${sessionUser.balance}</div>
                     </div>}
                     <div id='price-booking'>
                        <div>Price : </div>
                        <div id='booking-price'>${serviceDetails.price}</div>
                     </div>
                     {sessionUser &&
                     <div id='price-calculation'>
                     <div>Post Purchase Balance : </div>
                     <div id='total-after-cost'> ${sessionUser.balance - serviceDetails.price}</div>
                     </div>}

                     <form  onSubmit={handleSubmit} method="post">
                     <div>Instructions</div>
                     <textarea
                    type='text'
                    required
                    className='booking-Inputs'
                     onChange={(e) => setInstructions(e.target.value)}
                     placeholder='Instructions'
                     name='instructions'
                     value={instructions}
                     />
                     {/* {enoughMoney() ?
                     <button
                     className='booking-Inputs'
                     type="submit"
                     id='submit-booking'
                        >Order</button> :
                        <div id='not-enough-money'> Please add funds to your balance to book! </div>
                        } */}
                        {validationChecker()}
                    </form>

                </div>



            </div>
        </div>
    )
}

export default ServiceDetails
