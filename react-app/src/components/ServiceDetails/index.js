import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getServiceDetails} from '../../store/service'

function ServiceDetails(){
    const {serviceId} = useParams()
    const dispatch = useDispatch()
    const serviceDetails = useSelector(state => state.services.serviceDetails)
    const serviceDetailsData = Object.values(serviceDetails)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        dispatch(getServiceDetails(serviceId))
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();
    }, [dispatch, serviceId])



    const serviceOwnerArray = users.filter(user => user.id === serviceDetails.user_id)
    const serviceOwner = serviceOwnerArray[0]

    console.log('owner', serviceOwner)

    if(!serviceDetailsData.length || !serviceOwnerArray.length ){
        return null
    }

    return (
        <div>
        <h2>Service Details Page</h2>
        <div>{serviceDetails.title}</div>
        <img src={serviceDetails.thumbnail} />
        <div>{serviceDetails.description}</div>
        <div>{serviceDetails.price}</div>

        <h2>Service Provider Details</h2>
        {/* <div>{serviceOwner.profile_photo}</div> */}
        <div>{serviceOwner.username}</div>
        <div>{serviceOwner.bio}</div>

        </div>
    )
}

export default ServiceDetails
