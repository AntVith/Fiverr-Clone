import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams } from 'react-router-dom';
import {postReview} from '../../store/review'

function PostReview(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {serviceId} = useParams()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(5)

    const sessionUser = useSelector(state => state.session.user);


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('in submit')

        const formData = {
            "user_id": sessionUser.id,
            "service_id": Number(serviceId),
            review,
            "stars": Number(stars)
        }
        const postedReview = await dispatch(postReview(formData))

        if(postedReview){
            history.push('/orders')
        }
    }

    return (
        <div id='PostReviewContainer'>
            <form id='post-review' onSubmit={handleSubmit} method='post'>
                <h2 id='review-title'>Striverr prides itself on reliability and upholding a certain standard of service.</h2>
                 <h2>We want your feedback on your booking experience!</h2>

                    <div id='review-comment-input'>
                     <label className='post-labels'>How was your experience with this booking?</label>
                     <textarea
                        type='text'
                        required
                        className='Post-Service-Inputs'
                     onChange={(e) => setReview(e.target.value)}
                     placeholder='Feel free to write any comments, concerns, or thoughts'
                     name='review'
                     value={review}
                     />
                    </div>
                    <div id='review-star-rating'>
                     <label className='post-labels'>Star Rating</label>
                     <select
                     name='stars'
                     className='Post-Service-Inputs'
                     onChange={(e) => setStars(e.target.value)}
                     value={stars}>
                        <option value='1' >1</option>
                        <option value='2' >2</option>
                        <option value='3' >3</option>
                        <option value='4' >4</option>
                        <option value='5' >5</option>
                    </select>
                </div>
                <button  id='post-review-button' type='submit'>Submit Review</button>
                <button onClick={() => history.push('/orders')}>Skip</button>

            </form>
        </div>
    )

}

export default PostReview
