import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import './App.css';
import facebookLoginImage from './Images/facebookLogin.png';


var Facebook;
function App() {

  const [user, setUser] = useState({});

  function handleGoogleLogin(response){
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDivGoogle").hidden = true;
    document.getElementById("signInFacebook").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDivGoogle").hidden = false;
    document.getElementById("signInFacebook").hidden = false;
    
  }

  function handleFacebookLogin(){
    console.log(Facebook);
    Facebook.login(function(response){
      if(response.authResponse){
        console.log("Welcome! Fetching your information!");
        Facebook.api("/me", { fields: 'id,name,picture' }, function(response){
          console.log(response);
          setUser({
            id: response.id,
            name: response.name,
            picture: response.picture.data.url // Access profile picture URL
          });
        });
        document.getElementById("signInDivGoogle").hidden = true;
        document.getElementById("signInFacebook").hidden = true;
      }
      else {
        console.log("Facebook login failed: ", response.status);
      }
      
    });
    
  }
 
  // Setup Google Login
  useEffect(()=> {
    /* global google */
    google.accounts.id.initialize({
      client_id: "188519315872-dat9i412mchatlib7ip3kmulrl8nj9vi.apps.googleusercontent.com",
      callback: handleGoogleLogin
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDivGoogle"),
      {theme: "outline", size: "large"}
    );
  }, [])

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '824164816401663',
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
      Facebook = FB;
      console.log("Facebook SDK loaded successfully!");
    };
    

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      console.log("Facebook SDK loaded!");
    }(document, 'script', 'facebook-jssdk'));
  
  }, []);


  return (
    <div className="App">
      <div className='buttons'>
        <div id="signInDivGoogle"></div>
        <button style={{backgroundImage: `url(${facebookLoginImage})`}} id="signInFacebook" onClick={() => handleFacebookLogin()} />
          
        {
          Object.keys(user).length !== 0 && <button id="signOut" onClick={(e) => handleSignOut(e)}>Logout</button>
        }
      </div>
      
      
      {user && 
        <div className='userInfo'>
          <h2>User Info</h2>
          <img src={user.picture}/>
          <span>{user.name}</span>
        </div>
      }
      
    </div>
  );
}

export default App;
