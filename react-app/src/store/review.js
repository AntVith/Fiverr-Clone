const GET_REVIEWS = 'reviews/GET_REVIEWS'
// const POST_REVIEW = 'reviews/POST_REVIEW'
const DELETE_REVIEW ='reviews/DELETE_REVIEW'
// const EDIT_REVIEW = 'reviews/EDIT_REVIEW'



const get_reviews = (data) => ({
    type:GET_REVIEWS,
    data
})

const delete_review = (id) => ({
    type: DELETE_REVIEW,
    id
})

export const deleteReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const message = await response.json()
        dispatch(delete_review(id))
        return message
    }
}

export const getReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/review/service/${id}`)

    if(response.ok){
        console.log('thunk')
        const data = await response.json()
        if(data.errors){
            return
        }
        dispatch(get_reviews(data))
    } else{
        console.log('error')
    }
}
export const postReview = (formData) => async (dispatch) => {
    const response = await fetch('/api/review/new', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })

    if(response.ok){
        console.log('success')
        const newReview = await response.json()
        return newReview
    }
}


const initialState = { reviews: {} };

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEWS:{
            const newState = { reviews: {} }
            console.log('reducer')
            action.data.reviews.forEach(review => {
                newState.reviews[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW:{
            const newState = {...state}
            const newReviews = {...state.reviews}
            delete newReviews[action.id]
            newState.reviews = newReviews
            return newState
        }
        default:
          return state;
    }
}

export default reviewReducer
