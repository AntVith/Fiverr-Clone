import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {getAllServices} from '../../store/service'

import '../AllServices/allServices.css'


function SearchResults(){

    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.session.user)
    const servicesObj = useSelector(state => state.services.allServices)
    const services = Object.values(servicesObj)
    // console.log('services', services)

    const searchWordObject = useParams()
    const searchWord = searchWordObject.input.toLowerCase()

    const [users, setUsers] = useState([]);

    useEffect(() => {
        dispatch(getAllServices())
        async function fetchData() {
         const response = await fetch('/api/users/');
         const responseData = await response.json();
         setUsers(responseData.users);
       }
       fetchData();
    }, [dispatch, loggedIn])

    if(!services.length){
        return null
    }
    if(!users.length){
        return null
    }
    const filtered = services.filter(service => {
        const description = service.description.toLowerCase()
        const title = service.title.toLowerCase()
        return description.includes(searchWord)|| title.includes(searchWord)


    })
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

    function hasSearchResults(){
        if(filtered.length){
            return <div id='all-services-home'>
            {filtered.map(service => (
                <NavLink
                to={`/services/${service.id}`}
                style={{ textDecoration: 'none' }}
                className='navlink-service-cards-home'
                >
                    <div id='service-details'>
                        <img src={service.thumbnail}
                        id='service-image-homepage'
                        onError={e => {e.target.src = 'https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2021/03/CDG_blog_post_image_02-2.jpg'}}
                         />
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
        } else{
            return <div id='all-services-home'>
                <div id='nothing-found-messages'>
                    <p id='nothing-found'>Nothing was found :(</p>
                    <p id='recommendation-message'>Try searching for the programming language or the framework/library that you are trying to find a service for!</p>
                </div>
                </div>
        }
    }

     return (
        <div id='whole-home-page'>
        <div id='service-container'>
            {hasSearchResults()}
        </div>
        </div>

    )

}

export default SearchResults
