import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import {editAService} from '../../store/service'


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
                <ul>
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                     ))}
                 </ul>

                <input
                type='text'
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                name='title'
                value={title}
                />
                <textarea
                type='text'
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
                name='description'
                value={description}
                />
                <input
                type='number'
                pattern="[0-9]*"
                required
                onChange={(e) => setPrice(e.target.value)}
                placeholder='$1'
                name='price'
                value={price}
                />
                <input
                type='text'
                required
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder='Thumbnail'
                name='thumbnail'
                value={thumbnail}
                />
                <button className='song-submit-button' type="submit"
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
