import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getServiceDetails} from '../../store/service'
import './ServiceDetails.css'
function ServiceDetails(){
    const {serviceId} = useParams()
    const dispatch = useDispatch()
    const serviceDetails = useSelector(state => state.services.serviceDetails)
    const serviceDetailsData = Object.values(serviceDetails)
    const [users, setUsers] = useState([]);
    const [instructions, setInstructions] = useState('')

    useEffect(() => {
        dispatch(getServiceDetails(serviceId))
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();
    }, [dispatch, serviceId])

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

    const serviceOwnerArray = users.filter(user => user.id === serviceDetails.user_id)
    const serviceOwner = serviceOwnerArray[0]

    // console.log('owner', serviceOwner)


    if(!serviceDetailsData.length || !serviceOwnerArray.length ){
        return null
    }
    function enoughMoney(){
        console.log('in money',(serviceOwner.balance - serviceDetails.price) )
        if((serviceOwner.balance - serviceDetails.price) >0){
            return true
        } else{
            return false
        }
    }

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
            src={serviceDetails.thumbnail} />
            <div id='details-description'>
                <div id='Details-description-title'>About This Gig</div>
                <div id='details-description-info'>{serviceDetails.description}</div>
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
                     <div id='user-balance'>
                        <div id='user-balance-label'>Your Balance :</div>
                         <div id='user-balance-amount'> ${serviceOwner.balance}</div>
                     </div>
                     <div id='price-booking'>
                        <div>Price : </div>
                        <div id='booking-price'>${serviceDetails.price}</div>
                     </div>
                     <div id='price-calculation'>
                     <div>Post Purchase Balance : </div>
                     <div id='total-after-cost'> ${serviceOwner.balance - serviceDetails.price}</div>
                     </div>
                     <div>Instructions</div>
                     <input
                    type='textarea'
                    required
                    className='booking-Inputs'
                     onChange={(e) => setInstructions(e.target.value)}
                     placeholder='Instructions'
                     name='instructions'
                     value={instructions}
                     />
                     {enoughMoney() ?
                     <button
                     className='booking-Inputs'
                    type="submit"
                    id='submit-booking'
                    // disabled={enoughMoney}
                        >Order</button> :
                        <div id='not-enough-money'> Please add funds to your balance to book! </div>
                        }
                </div>



            </div>
        </div>
    )
}

export default ServiceDetails
