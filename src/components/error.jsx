import React from 'react';

const Error = ({ error }) => {
  return ( 
    <p className="text-red-500">Error: {error}</p>
   );
}
 
export default Error;