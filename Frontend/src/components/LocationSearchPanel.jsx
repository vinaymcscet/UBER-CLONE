import React from 'react'
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = (props) => {
    // sample array for locations
    const locations = [
        "24B, near Kapoor's cafe, Sheriyans Coding school, Bhopal",
        "22C, near Malhotra's cafe, Sheriyans Coding school, Bhopal",
        "20B, near Singhai's cafe, Sheriyans Coding school, Bhopal",
        "18B, near verma's cafe, Sheriyans Coding school, Bhopal",

    ]
  return (
    <div>
        {/* For sample data */}
        {
            locations.map((elem, idx) => {
                return <div key={idx} onClick={() => {
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-gray-50 border-2 active:border-black p-3 items-center rounded-xl my-2 justify-start '>
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center  rounded-full'><i className='ri-map-pin-fill'></i></h2>
                    <h4 className='font-medium'>{elem}</h4>
                </div>

            })
        }
    </div>
  )
}

export default LocationSearchPanel