import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import App from './App'
import LinkedInCallbackWrapper from './components/LinkedInCallbackWrapper'


const Root = () => {
  return (
    <Router>
      <Routes>
        <Route  path='/' Component={App}/>
        <Route  path='/linkedin' Component={LinkedInCallbackWrapper}/>
      </Routes>
    </Router>
  )
}

export default Root