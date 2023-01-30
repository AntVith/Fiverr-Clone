const GET_BOOKINGS = 'orders/GET_BOOKINGS'

const get_bookings = (data) => ({
    type:GET_BOOKINGS,
    data
})

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
        default:
          return state;
    }
}

export default bookingReducer
