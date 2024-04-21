import {useEffect, useState} from 'react';
import axios from 'axios';

const LinkedInCallbackWrapper = () => {
  
  const [requestSent, setRequestSent] = useState(false);
  useEffect(()=>{
    async function handleLogin(){
      
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        //const state = params.get('state');
        
        try {
          const response = await axios.post("http://localhost:5000/linkedin/user-info", { code: code});
          if(response.data.message) {
            console.log(response.data.message);
          }
          console.log(response);
        }
        catch (error){
          console.error("Error exchanging code for accesstoken: ", error);
        }

        setRequestSent(true);
        
    }
      
    if(!requestSent){
      handleLogin();
      
    }
    
    
  }, [])


  

  return (
    <div>
      <span>Test</span>
    </div>
  )
}

export default LinkedInCallbackWrapper

