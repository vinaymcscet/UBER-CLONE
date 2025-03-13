import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [userData, setUserData] = useState({});
  
  const { captain, setCaptain } = useContext(CaptainDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate:vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('captain', data.token);
      navigate('/captain-home');
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }
  return (
    <div>
      <div className='py-5 px-5 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-10' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='Uber Logo' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2 w-full'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-6'>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' required type='text' placeholder='First name' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' required type='text' placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>what's our Captain's email?</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-6'>
            <input 
              value={vehicleColor} 
              onChange={(e) => setVehicleColor(e.target.value)} 
              className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' 
              required 
              type='text' 
              placeholder='Vehicle Color' 
            />
            <input 
              value={vehiclePlate} 
              onChange={(e) => setVehiclePlate(e.target.value)} 
              className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' 
              required 
              type='text' 
              placeholder='Vehicle Plate' 
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input 
              value={vehicleCapacity} 
              onChange={(e) => setVehicleCapacity(e.target.value)} 
              className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base' 
              required 
              type='number'
              min="1"
              placeholder='Vehicle Capacity' 
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base'
              required
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          
          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-sm'>Create Captain Account</button>
          <p className='text-center'>Already have a account? <Link className='text-blue-600' to="/captain-login">Login here</Link></p>
        </form>
      </div>
      <div>
      <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup