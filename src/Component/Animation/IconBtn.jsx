import React from 'react';
import { FiEdit } from 'react-icons/fi';

const IconBtn = ({
  text,
  onClick,  // Corrected name
  children,
  disabled,
  outline = false,
  customClasses = "", // Default to an empty string
  type = "button", // Default type as "button"
}) => {
  return (
    <button
      className={`flex items-center gap-x-2 rounded-md py-2 px-3 md:px-5 text-sm md:text-lg font-semibold text-white
      ${outline ? 'border-2 border-magenta-500 text-magenta-500 bg-transparent' : 'bg-magenta-500'} 
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${customClasses}`} // Apply custom classes dynamically
      disabled={disabled}
      onClick={onClick} // Corrected the event handler
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
      <FiEdit />
    </button>
  );
};

export default IconBtn;
