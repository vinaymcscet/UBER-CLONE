import React from 'react'
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = ({ suggestions = [], setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.mainText);
        } else if (activeField === 'destination') {
            setDestination(suggestion.mainText);
        }
        // setPanelOpen(false);
        // setVehiclePanel(true);
    };

    return (
        <div>
            {Array.isArray(suggestions) && suggestions.map((suggestion, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='flex gap-4 border-gray-50 border-2 active:border-black p-3 items-center rounded-xl my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                        <i className='ri-map-pin-fill'></i>
                    </h2>
                    <div className='flex flex-col'>
                        <h4 className='font-medium'>{suggestion.mainText}</h4>
                        <p className='text-sm text-gray-500'>{suggestion.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;