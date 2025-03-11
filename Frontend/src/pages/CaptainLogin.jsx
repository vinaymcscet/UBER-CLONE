import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if(response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('captain', data.token);
      navigate('/captain-home');
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='Uber Logo' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>what's your email?</h3>
          <input value={email} onChange={e => setEmail(e.target.value)} className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={e => setPassword(e.target.value)} className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>Join a fleet? <Link className='text-blue-600' to="/captain-signup">Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to="/login" className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin