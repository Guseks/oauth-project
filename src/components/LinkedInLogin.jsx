import {useState} from 'react'
import { Headline, Name, UserInfo, Container, Image, Logout } from './userInfo';
import {LinkedInLoginButton} from "react-social-login-buttons";
import { v4 as uuiv4 } from 'uuid';






const LinkedInLogin = () => {

  const [user, setUser] = useState(null);

  const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID; 
  const redirect_URL = process.env.REACT_APP_LINKEDIN_REDIRECT;
  const scope = "openid profile email";
  const state = uuiv4();
  
  const handleLinkedInLogin = async () => {
    
    console.log("test");
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect_URL)}&state=${state}&scope=${encodeURIComponent(scope)}`;
    const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');
    
  
  }
  
  return (
    <Container>
       <Headline>LinkedIn</Headline>
       {user ? (
          <UserInfo>
            <Name>{user.name}</Name>
            <Image  src={user.picture}/>
            <Logout  onClick={() => setUser(null)}>Logout Facebook</Logout>
          </UserInfo>
       ) : (

       <LinkedInLoginButton  onClick={()=> handleLinkedInLogin()}/>
        
       )}
       
    </Container>
  )
}

export default LinkedInLogin