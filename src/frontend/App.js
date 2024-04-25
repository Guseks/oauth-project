import FacebookLogin from "./components/FacebookLogin";
import GoogleLogin from "./components/GoogleLogin";
import LinkedInLogin from "./components/LinkedInLogin";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <GoogleLogin />
      <FacebookLogin />
      <LinkedInLogin />
    </div>
  );
}

export default App;
