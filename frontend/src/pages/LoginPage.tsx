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
    <Grid container spacing={3} sx={{ padding: '78px 0' }}>
      <Grid item xs={4}></Grid>
      <Grid item xs={2.5} sx={{ minWidth: '350px' }}>
        <Paper
          elevation={14}
          sx={{
            padding: ' 2em',
            borderRadius: '30px',
            backgroundColor: 'rgba(252, 252, 252, 0.8)',
          }}
        >
          <Typography
            component="h2"
            align="center"
            sx={{ marginBottom: '20px' }}
          >
            Start Somewhere. Start Now.
          </Typography>
          <Link
            to="/createAccount"
            style={{
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                mt: 3,
                mb: 2,
                width: '100%',
                border: '1px solid #2f2d13',
                borderRadius: '40px',
                margin: '0 auto',
                display: 'flex',
                color: '#2f2d13',
                '&:hover': {
                  color: '#f9f9f9',
                  backgroundColor: '#2f2d13',
                  borderBottom: '1px solid transparent',
                  cursor: 'pointer',
                },
              }}
            >
              Create Account
            </Button>
          </Link>
          <Login />
          <Grid container justifyContent="center" sx={{ marginBottom: '12px' }}>
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
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}
