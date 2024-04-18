
import './App.css';

import FacebookLogin from './components/FacebookLogin';
import GoogleLogin from './components/GoogleLogin';
//import LinkedInLogin from './components/LinkedInLogin';
import LinkedInLogin2 from './components/LinkedInLogin2';



function App() {

  return (
    <div className="App">
      
      <GoogleLogin/>
      <FacebookLogin/>
      <LinkedInLogin2/>
       
    </div>
  );
}

export default App;
