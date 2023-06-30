import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import HeroImage from '../images/HeroImage.jpg'
import axios from 'axios'
import { login } from '../features/auth/authSlice'
export default function Home() {
  interface userState {
    user: any
  }
  const { user }: userState = useAppSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch()

  const loginDemo = () => {
    dispatch(
      login({
        email: 'finn@imadog.com',
        password: 'FinnFinn',
      }),
    )
  }

  return (
    <Grid
      container
      spacing={0}
      // sx={{
      //   padding: '78px 0',
      //   height: '90vh',
      //   display: 'flex',
      //   // flexDirection: 'column', -> not needed?
      //   alignItems: 'center',
      //   justifyContent: 'center',
      // }}
    >
      <Grid
        item
        xs={8}
        // sx={{
        //   backgroundColor: 'rgba(252, 252, 252, 0.5)',
        //   padding: '1rem',
        //   textAlign: 'center',
        //   borderRadius: '10px',
        // }}
      >
        {user ? (
          <>
            <h1>Hi {user.name}</h1>
            <h2>Welcome Back!</h2>
          </>
        ) : (
          <>
            <h1> Seeking an extra dose of motivation?</h1>
            <h2>Look no further!</h2>
            <h4>
              Start Somewhere provides a unique approach to goal achievement and
              is the perfect companion, empowering you to allocate your time
              effectively and track progress towards achieving success in your
              goals.
            </h4>
          </>
        )}

        {user ? (
          <Link
            to={`/goals/user/${user._id}`}
            // style={{ textDecoration: 'none', margin: '1rem' }}
          >
            <Button
              variant="contained"
              // sx={{
              //   mt: 3,
              //   mb: 2,
              //   borderRadius: '40px',
              //   margin: '0 auto',
              // }}
            >
              Go to my dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link
              to="login"
              // style={{ textDecoration: 'none', margin: '1rem' }}
            >
              <Button
                variant="contained"
                // sx={{
                //   mt: 3,
                //   mb: 2,
                //   borderRadius: '40px',
                //   margin: '0 auto',
                // }}
              >
                Log In
              </Button>
            </Link>

            <Button
              onClick={loginDemo}
              variant="contained"
              // sx={{
              //   mt: 3,
              //   mb: 2,
              //   borderRadius: '40px',
              //   margin: '0 auto',
              // }}
            >
              Try out a demo
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  )
}
