import {useState} from 'react'
import axios from "axios"
import {LoginSocialFacebook} from "reactjs-social-login";
import {FacebookLoginButton} from "react-social-login-buttons";
import { Headline, Name, UserInfo, Container } from './userInfo';



const FacebookLogin = () => {

  const [user, setUser] = useState(null);

  async function handleFacebookLogin(data){
    try {
      const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${data.accessToken}`);
      
      setUser({
        id: response.data.id,
        name: response.data.name,
        picture: response.data.picture.data.url // Access profile picture URL
      });
    }
    catch (error){
      console.error('Error fetching profile information:', error);
    }
    
  }


  return (
    <Container>
       <Headline>Facebook</Headline>
       {user ? (
          <UserInfo>
            <Name>{user.name}</Name>
            <img style={{width: "70px"}} src={user.picture}/>
            <button style={{width: "150px"}} onClick={() => setUser(null)}>Logout Facebook</button>
          </UserInfo>
       ) : (
        <LoginSocialFacebook
          isOnlyGetToken
          appId='824164816401663'
         
          onResolve={({data}) => {
            handleFacebookLogin(data);
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <FacebookLoginButton/>
        </LoginSocialFacebook> 
       )}
        
       
       
    </Container>
  )
}

export default FacebookLogin