import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => props.setVehiclePanel(false)}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
        <h3 className='text-exl font-semibold mb-5'>Choose a vehicle</h3>
        <div onClick={() => {
          props.setConfirmedRidePanel(true)
          props.selectVehicle('car')
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-center p-3'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png' alt="" />
          <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base'>Uber Go <span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ {props.fare.car}</h2>
        </div>
        <div onClick={() => {
          props.setConfirmedRidePanel(true)
          props.selectVehicle('moto')
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-center p-3'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt="" />
          <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ {props.fare.moto}</h2>
        </div>
        <div onClick={() => {
          props.setConfirmedRidePanel(true)
          props.selectVehicle('auto')
          }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-center p-3'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt="" />
          <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base'>Uber Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ {props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel