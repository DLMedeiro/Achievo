import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Greeter from './components/Greeter'
import Container from '@mui/material/Container'
import LoginForm from './pages/LoginPage'
import NavBar from './components/NavBar'
import FinnModal from './components/FinnModal'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { v4 as uuidv4 } from 'uuid'
import AddActivity from './components/forms/ActivityInputForm'
import Item from './models/Item'
import './styles/Utilities.css'

import './styles/App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CreateAccount from './pages/CreateAccount'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ActivityEditForm from './components/forms/ActivityEditForm'

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
    secondary: {
      dark: '#e8b29e',
      light: '#e1def1',
      main: '#cb99d5',
    },
    info: {
      main: '#e8b29e',
      light: '#e1def1',
      dark: '#cb99d5',
    },
  },
})

function App() {
  const [listItems, setListItems] = useState<Item[]>([])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/activities" element={<Dashboard />} />
            <Route path="/activityEditForm" element={<ActivityEditForm />} />
          </Routes>
          <FinnModal />
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
