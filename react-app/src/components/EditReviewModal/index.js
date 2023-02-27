import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { editReview } from "../../store/review";

function EditReview({reviewId, serviceId}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal();

    const sessionUser = useSelector(state => state.session.user);

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(5)

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log('in submit')
        console.log('reviewid', reviewId)
        console.log('service', serviceId)

        const formData = {
            "user_id": sessionUser.id,
            "service_id": Number(serviceId),
            review,
            "stars": Number(stars)
        }
        console.log('data', formData)
        const postedReview = await dispatch(editReview(reviewId, formData))

        if(postedReview){
            (closeModal)
            (history.push(`/services/${serviceId}`))
        }
    }


    return (
        <div id='edit-booking-container'>
        <form id= 'edit-booking-form' onSubmit={handleSubmit}>
            <h2 id='edit-booking-title'>Update Review</h2>

            <div id='instructions-edit-booking'>
                <label id="edit-booking-label">Comment</label>
              <textarea
                type='text'
                required
                onChange={(e) => setReview(e.target.value)}
                value={review}
                name="review"
                id= 'edit-booking-form-input'
              />
              </div>
              <div id='instructions-edit-booking'>
                <label id="edit-booking-label">Star Rating</label>
              <select
                required
                onChange={(e) => setStars(e.target.value)}
                value={stars}
                name="stars"
                id= 'edit-review-form-input'>
                <option value='1' >1</option>
                <option value='2' >2</option>
                <option value='3' >3</option>
                <option value='4' >4</option>
                <option value='5' >5</option>
              </select>
              </div>
          <button id="edit-booking-button" type='submit'>Confirm</button>
        </form>
        </div>

    )
}

export default EditReview
