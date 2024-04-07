import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [user, setUser] = useState({});


  function handleCallbackResponse(response){
    //console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function handleFacebookLogin(response){
    console.log(response)
    /*
    FB.login(function(response){
      if(response.authResponse){
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          // Fetch user data and update state
          setUser(response);
        });
      }
      else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },  { scope: 'public_profile,email' });
    */
  }
    
    /*
    if(facebookSDKLoaded){
      FB.login(function(response){
        if(response.authResponse){
          console.log('Welcome! Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            // Fetch user data and update state
            setUser(response);
          });
        }
        else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },  { scope: 'public_profile,email' });
    }
    else {
      console.error("Facebook SDK not initialized");
    }
    */
    
  
 
  // Setup Google Login
  useEffect(()=> {
    /* global google */
    google.accounts.id.initialize({
      client_id: "188519315872-dat9i412mchatlib7ip3kmulrl8nj9vi.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDivGoogle"),
      {theme: "outline", size: "large"}
    );
  }, [])

  useEffect(()=> {

    

    FB.getLoginStatus(function(response) {
      handleFacebookLogin(response);
    });
    
  }, [])
    /*
    const facebookScript = document.getElementById("facebook-script");
    facebookScript.onload = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '468487348838237',
          cookie     : true,
          xfbml      : true,
          version    : 'v19.0'
        });
        // Additional initialization code here
      };
      

    }
    */

    /*
    const initFacebookSDK = () => {
      try {
        FB.init({
          appId: '824164816401663',
          cookie: true,
          xfbml: true,
          oauth: true,
          status: true,
          version: 'v19.0'
        });
        facebookSDKLoaded = true;
      }
      catch (err) {
        console.error(err);
      }
      
    
    };

    initFacebookSDK();
    
*/
    
 
  // If we have no user -> show login button
  // If user logged in, show logout button

  return (
    <div className="App">
      <div className='buttons'>
        <div id="signInDivGoogle"></div>
        <button onClick={() => handleFacebookLogin()}>Login with Facebook</button>
        {
          Object.keys(user).length !== 0 && <button id="signOut" onClick={(e) => handleSignOut(e)}>Logout</button>
        }
      </div>
      
      
      {user && 
        <div className='userInfo'>
          <img src={user.picture}/>
          <h3>{user.name}</h3>
        </div>
      }
      
    </div>
  );
}

export default App;
