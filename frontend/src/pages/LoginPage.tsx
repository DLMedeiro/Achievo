import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Login from '../components/forms/Login'
import { Grid, Paper } from '@mui/material'
// import MUILink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'

export default function LoginForm(): JSX.Element {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Paper
      elevation={14}
      // sx={{
      //   padding: ' 2em',
      //   borderRadius: '30px',
      //   backgroundColor: 'rgba(252, 252, 252, 0.8)',
      // }}
    >
      <Typography component="h2" align="center">
        Start Somewhere.
      </Typography>
      <Typography
        component="h3"
        align="center"
        // sx={{ marginBottom: '20px' }}
      >
        Start Now.
      </Typography>
      <Login />
      <Link
        to="/createAccount"
        // style={{
        //   textDecoration: 'none',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
      >
        <Button
          variant="contained"
          // sx={{
          //   mt: 3,
          //   mb: 2,
          //   width: '100%',
          //   borderRadius: '40px',
          //   margin: '0 auto',
          //   display: 'flex',
          //   color: '#2f2d13',
          //   '&:hover': {
          //     color: '#2f2d13',
          //     backgroundColor: '#f6cdfe',
          //     cursor: 'pointer',
          //   },
          // }}
        >
          Create Account
        </Button>
      </Link>

      <Grid
        container
        justifyContent="center"
        //  sx={{ marginBottom: '12px' }}
      >
        {/* <MUILink href="#" variant="body2">
              Forgot your password?
            </MUILink> */}
      </Grid>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't feel like creating and account? Have fun with Finn's account.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Email: finn@imadog.com
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Password: FinnFinn
      </Typography>
    </Paper>
  )
}
