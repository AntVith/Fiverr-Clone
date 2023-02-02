import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllServices} from '../../store/service'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './allServices.css'
function AllServices() {
    const dispatch = useDispatch()
    const servicesObj = useSelector(state => state.services.allServices)
    const services = Object.values(servicesObj)
    const totalServices = services.length
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
       dispatch(getAllServices())
       async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, [dispatch])

    const images = ['https://www.freecodecamp.org/news/content/images/2021/01/image-155.png','https://kinsta.com/wp-content/uploads/2021/03/javascript-libraries.png', 'https://miro.medium.com/max/1400/1*3vOvKvhf_YC5XzU6oFWRhw.png', 'https://www.makewonder.com/wp-content/uploads/sites/4/2021/01/coding-languages-image.jpeg', 'https://res.cloudinary.com/practicaldev/image/fetch/s--YHR2L-mf--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/68cjjc8ujhz1o6anuq6s.png', 'https://www.indiewire.com/wp-content/uploads/2017/10/matrix-code.jpg']

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((currentIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);



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
        <div id='whole-home-page'>
        <div id='imgSlider'>
        <TransitionGroup>
          <CSSTransition
          key={images[currentIndex]}
          timeout={8000}
          classNames='slide'
          >
          <img id='splash-image-login'  src={images[currentIndex]}/>
          </CSSTransition>
        </TransitionGroup>
      </div>
        <div id='service-container'>
            <div id='all-services-home'>
            {services.map(service => (

                <NavLink
                to={`/services/${service.id}`}
                style={{ textDecoration: 'none' }}
                className='navlink-service-cards-home'
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
        </div>
    )
}

export default AllServices;
