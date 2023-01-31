import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { editABooking} from '../../store/booking'
import './editBooking.css'

function EditBookingModal(bookingId){
    const bookingsObj = useSelector(state => state.bookings.bookings)
    const allUserBookings = Object.values(bookingsObj)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const bookingToEditId = bookingId.bookingId

    const bookingToEditArray = allUserBookings.filter(booking => booking.id === Number(bookingToEditId))
    const bookingToEdit = bookingToEditArray[0]
    const [instructions, setIntructions] = useState(bookingToEdit.instructions)


    const handleSubmit = async (e) => {
        e.preventDefault()


        const payload = {
            'user_id': sessionUser.id,
            'service_id': bookingToEdit.service_id,
            'instructions': instructions,
        }
        const editedBooking = await dispatch(editABooking(payload, bookingToEditId))

        if(editedBooking) {
          (closeModal)
          (history.push(`/orders`))
        }

    }

    return (
        <div id='edit-booking-container'>
        <form id= 'edit-booking-form' onSubmit={handleSubmit}>
            <h2 id='edit-booking-title'>Update Instructions</h2>
            <div id='instructions-edit-booking'>
                <label id="edit-booking-label">Instructions</label>
              <textarea
                type='text'
                required
                onChange={(e) => setIntructions(e.target.value)}
                value={instructions}
                name="instructions"
                id= 'edit-booking-form-input'
              />
              </div>
          <button id="edit-booking-button" type='submit'>Confirm</button>


        </form>
        </div>
    )
}

export default EditBookingModal
