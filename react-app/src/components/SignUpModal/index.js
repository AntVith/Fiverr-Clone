import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useModal } from "../../context/Modal";

function SignUp(){
    const [errors, setErrors] = useState([]);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const onSignUp = async (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
        const data = await dispatch(signUp( first_name, last_name, username, email, bio, password))
        .then(() => closeModal)

        if (data) {
            setErrors(data)
        }

      } else{
         return setErrors['Passwords dont match']
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

    const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);
    };

    if (user) {

      return <Redirect to='/' />;
    }

    return (
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
        <div>
          <label>First Name</label>
          <input
            type='text'
            name='FirstName'
            onChange={updateFirstName}
            value={first_name}
          ></input>
        </div>
          <label>Last Name</label>
          <input
            type='text'
            name='LastName'
            onChange={updateLastName}
            value={last_name}
          ></input>
        </div>
        <div>
          <label>Username</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Biography</label>
          <input
            type='text'
            name='biography'
            onChange={updateBiography}
            value={bio}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    );
}
export default SignUp
