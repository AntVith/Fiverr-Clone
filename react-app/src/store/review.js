const GET_REVIEWS = 'reviews/GET_REVIEWS'
// const POST_REVIEW = 'reviews/POST_REVIEW'
// const DELETE_REVIEW ='reviews/DELETE_REVIEW'
// const EDIT_REVIEW = 'reviews/EDIT_REVIEW'


const get_reviews = (data) => ({
    type:GET_REVIEWS,
    data
})

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
        default:
          return state;
    }
}

export default reviewReducer
