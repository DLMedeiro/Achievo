import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import LoginForm from './pages/LoginPage'
import Appbar from './components/Appbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { v4 as uuidv4 } from 'uuid'
import Item from './models/Item'
import './styles/Utilities.css'
// import './styles/App.css'
import { useAppSelector } from './app/hooks'
import { RootState } from './app/store'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CreateAccount from './pages/CreateAccount'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import GoalEditForm from './components/forms/GoalEditForm'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: 'rgba(252, 252, 252, 0.7)',
//       light: '#f9f9f9',
//       dark: '#f6cdfe',
//       // dark: '#2f2d13',
//     },
//   },
// })

function App() {
  interface userState {
    user: any
  }
  interface goalState {
    goals: any
  }
  const [listItems, setListItems] = useState<Item[]>([])
  const { user }: userState = useAppSelector((state: RootState) => state.auth)
  const { goals }: goalState = useAppSelector((state: RootState) => state.goals)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <ThemeProvider theme={theme}> */}
      <Appbar />
      <Container maxWidth="md" className="top-container">
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path={`/goals/user/${user._id}`} element={<Dashboard />} />
            <Route path={`/goalEditForm`} element={<GoalEditForm />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
          </Routes>
        )}
      </Container>
      {/* </ThemeProvider> */}
    </LocalizationProvider>
  )
}

export default App
