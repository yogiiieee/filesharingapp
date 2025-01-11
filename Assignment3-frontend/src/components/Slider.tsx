import React from 'react'
import { SliderProps } from '../types/Slider.types'

const Slider: React.FC<SliderProps> = ({ isOn, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(!isOn)}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out
        ${isOn ? 'bg-green-400' : 'bg-gray-300'}`}
    >
      <div 
        className={`absolute bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
          ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </div>
  );
};

export default Slider;
