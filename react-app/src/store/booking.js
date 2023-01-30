const GET_BOOKINGS = 'orders/GET_BOOKINGS'
const POST_BOOKING = 'orders/POST_BOOKING'

const post_booking = (data) => ({
    type:POST_BOOKING,
    data
})

const get_bookings = (data) => ({
    type:GET_BOOKINGS,
    data
})

export const postABooking = (formData, serviceId) => async (dispatch) => {
    const response = await fetch(`/api/service/${serviceId}/book`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    if(response.ok){
        const newBooking = await response.json()
        dispatch(post_booking(newBooking))
        return newBooking
    }
}

export const getUserBookings = (id) => async (dispatch) => {
    const response = await fetch(`/api/booking/${id}`)

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }
        dispatch(get_bookings(data))
    } else{
        console.log('error')
    }
}


const initialState = { bookings: {} };

const bookingReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOKINGS:{
            const newState = {bookings:{}}
            action.data.bookings.forEach(booking => {
                newState.bookings[booking.id] = booking
            })
            return newState
        }
        case POST_BOOKING: {
            const newState = {...state}
            const newBookings = {...state.bookings}
            newBookings[action.data.id] = action.data
            newState.bookings = newBookings
            return newState
        }
        default:
          return state;
    }
}

export default bookingReducer
