import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useModal } from "../../context/Modal";
import './SignUpForm.css'

function SignUp(){
    const [errors, setErrors] = useState([]);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('');
    // const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const history = useHistory()

    const onSignUp = async (e) => {
      e.preventDefault();
        setErrors([])
        if(username.length > 30){
           return setErrors(['Username must be 30 characters or less'])
        }

        const data = await dispatch(signUp( first_name, last_name, username, email, bio, password))
        console.log('data', data)


        if (data && data.length > 0) {
            let errorMessages = []
             data.forEach(error => {
                let message = error.split(':')
                errorMessages.push(message[1])
                })
            setErrors(errorMessages)
        } else{
             return closeModal()
        }



    };
    const updateFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const updateLastName = (e) => {
        setLastName(e.target.value)
    }

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };
    const updateBiography = (e) => {
        setBio(e.target.value)
    }

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    if (user) {
      return <Redirect to='/' />;
    }

    return (
    <div id='sign-up-form-container'>
      <form  id='sign-up-form'onSubmit={onSignUp}>
        <h4 id='sign-up-title'>Join Striverr</h4>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id='sign-up-Fname'>
          <label className='sign-up-labels'>First Name</label>
          <input
            type='text'
            name='FirstName'
            required
            placeholder='First Name'
            className='sign-up-Inputs'
            onChange={updateFirstName}
            value={first_name}
          ></input>
        </div>
        <div id='sign-up-Lname'>
          <label className='sign-up-labels'>Last Name</label>
          <input
            type='text'
            name='LastName'
            placeholder='Last Name'
            required
            className='sign-up-Inputs'
            onChange={updateLastName}
            value={last_name}
          ></input>
          </div>

        <div id='sign-up-Uname'>
          <label className='sign-up-labels'>Username</label>
          <input
            type='text'
            name='username'
            required
            placeholder='Username'
            className='sign-up-Inputs'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div id='sign-up-Email'>
          <label className='sign-up-labels'>Email</label>
          <input
            type='text'
            name='email'
            required
            placeholder='Email'
            className='sign-up-Inputs'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div id='sign-up-Bio'>
          <label className='sign-up-labels'>Biography</label>
          <input
            type='text'
            name='biography'
            required
            placeholder='Biography'
            className='sign-up-Inputs'
            onChange={updateBiography}
            value={bio}
          ></input>
        </div>
        <div id='sign-up-Pass'>
          <label className='sign-up-labels'>Password</label>
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            className='sign-up-Inputs'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>

        <button type='submit'
        id='sign-up-submit'
        >Sign Up</button>
      </form>
      </div>
    );
}
export default SignUp
