import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const {user, setUser} = React.useContext(UserDataContext);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('user', data.token);
      navigate('/home');
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='Uber Logo' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>what's your email?</h3>
          <input value={email} onChange={e => setEmail(e.target.value)} className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={e => setPassword(e.target.value)} className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>New Here? <Link className='text-blue-600' to="/signup">Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to="/captain-login" className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin