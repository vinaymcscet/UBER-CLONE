import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});
  
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    })
    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
  return (
    <div>
      <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='Uber Logo' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>what's your name</h3>
          <div className='flex gap-4 mb-6'>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' required type='text' placeholder='First name' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' required type='text' placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>what's your email?</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-sm'>Login</button>
          <p className='text-center'>Already have a account? <Link className='text-blue-600' to="/login">Login here</Link></p>
        </form>
      </div>
      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
    </div>
  )
}

export default UserSignup