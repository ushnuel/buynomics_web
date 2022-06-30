import React from 'react';

export const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder} 
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      onBlur={props.onBlur}
      min={props.min}
      step={props.step}
      className={`bg-white 
          border-2 rounded-md w-full 
          py-2 px-4 md:py-2 focus:border-grey
          focus:outline-none focus:font-bold focus:bg-grey
        `}
    />
  )
}

export function Select(props) {
  return (
    <select
      disabled={props.isReadonly}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      value={props.value}
      name={props.name}
      className={`bg-white 
        border-2 rounded-md w-full 
        py-2 px-4 md:py-2 focus:border-grey
        focus:outline-none focus:font-bold focus:bg-grey
      `}>
        {props.children}
    </select>
  )
}

export function Label(props) {
  return (
    <div className="mb-3">
      <label className="block text-lg mb-1 md:mb-0">
        {props.label}
      </label>
    </div>    
  )
}