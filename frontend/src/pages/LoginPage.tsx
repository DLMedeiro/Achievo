import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Login from '../components/forms/Login'
import { Grid, Paper } from '@mui/material'
// import MUILink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularIndeterminate from '../components/Spinner'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'

export default function LoginForm(): JSX.Element {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Paper elevation={14} className="form-container">
      <Typography variant="h5" component="h5" align="center">
        Start Somewhere.
      </Typography>
      <Typography
        variant="h6"
        component="h6"
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
          className="btn"
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

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ marginTop: '1rem' }}
      >
        Don't feel like creating an account?
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Have fun with Finn's.
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
