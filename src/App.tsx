import React from 'react'
import Greeter from './components/Greeter'
import ActivityTracker from './components/ActivityTracker'
import LoginForm from './components/LoginForm'
import DrawerAppBar from './components/DrawerAppBar'
import FinnModal from './components/FinnModal'
import Home from './components/Home'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  return (
    <div>
      <DrawerAppBar />
      <Home />
      {/* <LoginForm /> */}
      {/* <Greeter person="Maggie" />
      <ActivityTracker /> */}
      <FinnModal />
    </div>
  )
}

export default App
