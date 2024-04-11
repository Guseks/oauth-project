
import './App.css';

import FacebookLogin from './components/FacebookLogin';
import GoogleLogin from './components/GoogleLogin';
import LinkedInLogin from './components/LinkedInLogin';

function App() {

  return (
    <div className="App">
      
      <GoogleLogin/>
      <FacebookLogin/>
      <LinkedInLogin/>
       
    </div>
  );
}

export default App;
