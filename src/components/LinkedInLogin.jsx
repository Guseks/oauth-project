import {useState} from 'react'
import {LoginSocialLinkedin} from "reactjs-social-login";
import {LinkedInLoginButton} from "react-social-login-buttons";
import { Headline, Name, UserInfo, Container, Image, Logout } from './userInfo';

const LinkedInLogin = () => {

  const [user, setUser] = useState(null);

  async function handleLinkedInLogin(data){
    try {
      setUser({
        id: data.id,
        name: data.name,
        picture: data.picture.data.url
      });      
    }
    catch (error){
      console.error('Error fetching profile information:', error);
    }
    
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
        <LoginSocialLinkedin
          
          appId={process.env.REACT_APP_LINKEDIN_ID} 
          onResolve={({data}) => {
            handleLinkedInLogin(data);
          }}
          onReject={(err) => {
            console.log(err)
          }}
          
        >
          <LinkedInLoginButton/>
        </LoginSocialLinkedin> 
       )}
        
    </Container>
  )
}

export default LinkedInLogin