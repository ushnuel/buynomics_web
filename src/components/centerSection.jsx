import React from 'react';

const CenterSection = (props) => {
  return ( 
    <section className={`${props.className} flex flex-col items-center justify-center p-5`}>
      {props.children}
    </section>
   );
}
 
export default CenterSection;