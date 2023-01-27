import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import {editAService} from '../../store/service'
import './editService.css'

function EditService(serviceId){
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [thumbnail, setThumbnail] = useState('')
    const [errors, setErrors] = useState([]);
    const [showSuccess, setSuccess] = useState(false);

    const serviceToEditId = serviceId.serviceId

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = {
            "user_id": sessionUser.id,
            title,
            description,
            "price": Number(price),
            thumbnail
        }
        console.log('serviceid', serviceId)
        console.log('in handle submit', formData)
        const createdService = await dispatch(editAService(formData, serviceToEditId))

        // setSuccess(true);
        // setTimeout(() => window.location.reload(true), 1000);



        if(createdService){
            (closeModal)
            // (setTimeout(() => {
            //     console.log('waiting')
            //   }, 1000))
            (history.push(`/users/${sessionUser.id}`))
        }
    }


    return (
        <div id='UploadServiceContainer'>
            <form id='upload-service-form' onSubmit={handleSubmit} method="post">
            <h2 id='post-title'>Edit your service</h2>
                <ul>
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                     ))}
                 </ul>

                <div id='title-post'>
                    <label className='post-labels'>Title</label>
                    <input
                        type='text'
                        required
                        className='Post-Service-Inputs'
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        name='title'
                        value={title}
                        />
                </div>
                <div id='description-post'>
                    <label className='post-labels'>Description</label>
                        <textarea
                        type='text'
                        required
                        className='Post-Service-Inputs'
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        name='description'
                        value={description}
                        />
                </div>
                <div id='price-post'>
                    <label className='post-labels'>Price</label>
                        <input
                        type='number'
                        pattern="[0-9]*"
                        required
                        className='Post-Service-Inputs'
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='$1'
                        name='price'
                        value={price}
                        />
                </div>
                <div id='thumbnail-post'>
                    <label className='post-labels'>Thumbnail Image</label>
                        <input
                        type='text'
                        required
                        className='Post-Service-Inputs'
                        onChange={(e) => setThumbnail(e.target.value)}
                        placeholder='Thumbnail'
                        name='thumbnail'
                        value={thumbnail}
                        />
                </div>
                        <button
                        className='Post-Service-Inputs'
                         type="submit"
                         id='submit-post'
                        // disabled={isLoading}
                        >Upload</button>
                        {showSuccess && (
                        <div>
                            <p>Post Successful!</p>
                        </div>

                )}
            </form>
        </div>
    )


}

export default EditService
