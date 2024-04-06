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
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '{app-id}',
        cookie     : true,
        xfbml      : true,
        version    : '{api-version}'
      });
      // Additional initialization code here
    };
  }, [])
  // If we have no user -> show login button
  // If user logged in, show logout button

  return (
    <div className="App">
      <div className='buttons'>
        <div id="signInDivGoogle"></div>
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
