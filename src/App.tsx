import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Greeter from './components/Greeter'
import Container from '@mui/material/Container'
import LoginForm from './components/LoginForm'
import DrawerAppBar from './components/DrawerAppBar'
import FinnModal from './components/FinnModal'
import Home from './components/Home'
import ActivitiesPage from './components/ActivitiesPage'
import { v4 as uuidv4 } from 'uuid'
import AddActivity from './components/ActivityInputForm'
import Item from './models/Item'

import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CreateAccount from './components/CreateAccount'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

function App() {
  const [listItems, setListItems] = useState<Item[]>([])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" sx={{ paddingTop: '5vh' }}>
          <DrawerAppBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            {/* <Route
              path="/addActivity"
              element={<AddActivity onAddItem={addItem} />}
            /> */}
            <Route path="/demo" element={<ActivitiesPage />} />
          </Routes>
          <FinnModal />
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
