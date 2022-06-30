import React from 'react';

const Button = (props) => {
  return ( 
    <button 
      onClick={props.onClick} 
      type={props.type} 
      className={`${props.className} hover:bg-gray-400 text-white px-7 py-2 rounded-md font-semibold`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
   );
}
 
export default Button;