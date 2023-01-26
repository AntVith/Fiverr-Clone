const GET_ALL_SERVICES = 'service/GET_ALL_SERVICES'
const GET_SERVICE_DETAILS = 'service/GET_SERVICE_DETAILS'
const POST_SERVICE = 'service/POST_SERVICE'

const postService = (data) => ({
    type: POST_SERVICE,
    data
})

const get_service_details = (data) => ({
    type: GET_SERVICE_DETAILS,
    data
})
const get_all_services = (data) => ({
    type:GET_ALL_SERVICES,
    data
})
export const createService = (formInfo) => async (dispatch) => {
    console.log('before fetch', formInfo)
    const response = await fetch(`/api/service/`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
    })
    console.log('after fetch')
    if(response.ok){
        const newService = await response.json()
        dispatch(postService(newService))
        return newService
    } else{
        return response
    }
}

export const getServiceDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/service/${id}`)

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }
        dispatch(get_service_details(data))
    }

}

export const getAllServices = () => async (dispatch) => {
    const response = await fetch('/api/service/')

    if(response.ok){
        const data = await response.json()
        if(data.errors){
            return
        }

        dispatch(get_all_services(data))
    }
}

const initialState = { allServices: {}, serviceDetails : {} };

const serviceReducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERVICES:{
            const newState = { allServices: {}, serviceDetails : {} }
            action.data.services.forEach(service => {
                newState.allServices[service.id] = service
            })
            return newState
        }
        case GET_SERVICE_DETAILS:{
            const newState = {...state}
            const newallServices = {...state.allServices}
            const serviceData = action.data
            newState.allServices = newallServices
            newState.serviceDetails = serviceData
            return newState
        }
        default:
          return state;
      }
}
export default serviceReducer
