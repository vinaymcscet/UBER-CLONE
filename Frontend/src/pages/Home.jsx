import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/userContext';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  
  const [activeField, setActiveField] = useState(null);
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id });
  }, [user])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    if (e.target.value.length < 2) {
        setPickupSuggestions([]);
        return;
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });
        
        if (response.data && response.data.predictions) {
            setPickupSuggestions(response.data.predictions);
        }
    } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
        setPickupSuggestions([]);
    }
}

const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    if (e.target.value.length < 2) {
        setDestinationSuggestions([]);
        return;
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user')}`
            }
        });
        
        if (response.data && response.data.predictions) {
            setDestinationSuggestions(response.data.predictions);
        }
    } catch (error) {
        console.error('Error fetching destination suggestions:', error);
        setDestinationSuggestions([]);
    }
}

const submitHandler = (e) => {
    e.preventDefault()
}

  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
        // opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0',
        padding: 0
        // opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen])

  useGSAP(function() {
    if(vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function() {
    if(confirmRidePanel) {
      gsap.to(confirmedRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmedRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])
  
  useGSAP(function() {
    if(vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])
  
  useGSAP(function() {
    if(waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    console.log("creating ride", pickup,
      destination,
      vehicleType);
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    console.log(response.data)
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temporary use  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1440/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      console.log("response", pickupSuggestions)
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>       
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4  className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={e => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-700 rounded-full"></div>
            <input 
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 rounded-lg w-full mt-5' 
              type="text" 
              placeholder='Add a pick-up location' 
            />
            <input 
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 rounded-lg w-full mt-5' 
              type="text" 
              placeholder='Enter your destination' 
            />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide fare={fare} vehicleType={vehicleType} createRide={createRide} pickup={pickup} destination={destination} setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12'>
          <LookingForDriver fare={fare} vehicleType={vehicleType} createRide={createRide} pickup={pickup} destination={destination}  setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
          <WaitingForDriver waitingForDriver={waitingForDriver} setVehicleFound={setVehicleFound} />
      </div>
    </div>
  )
}

export default Home