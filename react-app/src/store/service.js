const GET_ALL_SERVICES = 'service/GET_ALL_SERVICES'
const GET_SERVICE_DETAILS = 'service/GET_SERVICE_DETAILS'
const POST_SERVICE = 'service/POST_SERVICE'
const EDIT_SERVICE = 'service/EDIT_SERVICE'
const DELETE_SERVICE = 'service/DELETE_SERVICE'

const deleteService = (id) => ({
    type:DELETE_SERVICE,
    id
})
const editService = (data) => ({
    type:EDIT_SERVICE,
    data
})

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

export const deleteAService = (serviceId) => async (dispatch) => {
    const response = await fetch(`/api/service/${serviceId}/delete`, {
        method:'DELETE'
    })

    if (response.ok){
        dispatch(deleteService(serviceId))
    }else{
        return response
    }
}

export const editAService = (formData, serviceToEditId) => async (dispatch) => {
    console.log('in thunk')
    const response = await fetch(`/api/service/${serviceToEditId}/edit`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    if(response.ok){
        const newService = await response.json()
        console.log(' in pkay', newService)
        dispatch(editService(newService))
        return newService
    } else{
        return response
    }

}
export const createService = (formData) => async (dispatch) => {
    console.log('before fetch', formData)
    const response = await fetch(`/api/service/`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
            const newState = { allServices: {}, serviceDetails : {...state.serviceDetails} }
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
        case POST_SERVICE:{
            console.log('action data', action.data)
            const newState = {...state}
            const newallServices = {...state.allServices}
            const newServiceDetails = action.data
            newallServices[action.data.id] = action.data
            newState.allServices = newallServices
            newState.serviceDetails = newServiceDetails
            console.log('new state', newState)
            return newState
        }
        case EDIT_SERVICE:{
            const newState = {...state}
            const newallServices = {...state.allServices}
            newallServices[action.data.id] = action.data
            newState.allServices = newallServices
            return newState
        }
        case DELETE_SERVICE:{
            const newState = {...state}
            const newallServices = {...state.allServices}
            delete newallServices[action.id]
            newState.allServices = newallServices
            return newState
        }
        default:
          return state;
      }
}
export default serviceReducer
