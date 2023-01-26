import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import {createService} from '../../store/service'


function UploadNewService(){
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [thumbnail, setThumbnail] = useState('')
    const [errors, setErrors] = useState([]);
    const [showSuccess, setSuccess] = useState(false);

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
        console.log('in handle submit', formData)
        const createdService = await dispatch(createService(formData))

        setSuccess(true);
        setTimeout(() => window.location.reload(true), 1000);



        if(createdService){
            (closeModal)
            // (setTimeout(() => {
            //     console.log('waiting')
            //   }, 1000))
            (history.push(`/services/${createdService.id}`))
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
                type='text'
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

export default UploadNewService
