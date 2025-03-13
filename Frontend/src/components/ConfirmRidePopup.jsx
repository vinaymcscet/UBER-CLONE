import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState("")
    const submitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => props.setRidePopupPanel(false)}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-10 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
            <h2 className='text-lg font-medium'>Harsh Patel</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className='text-lg ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹ 193.20</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
            <form onSubmit={(e) => submitHandler(e)}>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
                <Link to='/captain-riding' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</Link>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(false)
                    props.setRidePopupPanel(false)
                }} className='w-full mt-2 text-lg flex justify-center bg-red-600 text-white font-semibold p-3 rounded-lg'>Cancel</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopup