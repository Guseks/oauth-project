import {useEffect, useState} from 'react';

const LinkedInCallbackWrapper = () => {

  

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if(state !== window.location.origin) return;
   

  }, [])


  

  return (
    <div>
      TEST
    </div>
  )
}

export default LinkedInCallbackWrapper

