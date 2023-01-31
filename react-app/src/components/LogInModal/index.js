import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LogInModal.css'

function LogIn(){
const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password))
   console.log('data',data)
    if (data) {
      setErrors(data);
    } else{
        closeModal()
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login(email, password));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='login-form-container'>
    <form id='login-form' onSubmit={onLogin}>
        <h4 id='login-title'>Sign In to Striverr</h4>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div id='login-email'>
        <label  id='login-label' htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          className='login-inputs'
          onChange={updateEmail}
        />
      </div>
      <div id='login-password'>
        <label  id='login-label'htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          className='login-inputs'
          onChange={updatePassword}
        />
      </div>
      <button
      id='login-submit'
      type='submit'>Login</button>
       <button  id='demo-user-login' onClick={demoLogin} type='submit'>Demo User</button>
    </form>
    </div>
  );
};

export default LogIn
