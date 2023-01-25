import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getServiceDetails} from '../../store/service'

function ServiceDetails(){
    const {serviceId} = useParams()
    const dispatch = useDispatch()
    const serviceDetails = useSelector(state => state.services.serviceDetails)
    const serviceDetailsData = Object.values(serviceDetails)

    useEffect(() => {
        dispatch(getServiceDetails(serviceId))
    }, [dispatch])



    if(!serviceDetailsData.length){
        return null
    }

    return (
        <div>
        <h1>Service Details Page</h1>
        <div>{serviceDetails.title}</div>
        <div>{serviceDetails.thumbnail}</div>
        <div>{serviceDetails.description}</div>
        <div>{serviceDetails.price}</div>
        </div>
    )
}

export default ServiceDetails
