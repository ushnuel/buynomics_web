import React from 'react';
import Error from './error';
import CenterSection from './centerSection';

const IntermidiaryDetailsContainer = (props) => {
  return ( 
    <CenterSection className="h-screen">
      {props.error && <Error error={props.error} />}
      <div className='md:w-3/5 w-full shadow px-3 py-7 md:p-7'>
        <h2 className='my-14'>Intermidiary Details</h2>
        {props.children}
      </div>
    </CenterSection>
   );
}
 
export default IntermidiaryDetailsContainer;