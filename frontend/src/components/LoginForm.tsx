import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

import SignUp from './SignUp'
import { Grid, Paper } from '@mui/material'
// import MUILink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function LoginForm(): JSX.Element {
  return (
    <Grid container spacing={3} sx={{ padding: '78px 0' }}>
      <Grid item xs={4}></Grid>
      <Grid item xs={2.5} sx={{ minWidth: '350px' }}>
        <Paper elevation={14} sx={{ padding: ' 2em', borderRadius: '30px' }}>
          <Typography
            component="p"
            align="center"
            sx={{ marginBottom: '20px' }}
          >
            Log in to be amused for a couple minutes
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
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '40px',
                margin: '0 auto',
              }}
            >
              Create Account
            </Button>
          </Link>
          <SignUp />
          <Grid container justifyContent="center" sx={{ marginBottom: '12px' }}>
            {/* <MUILink href="#" variant="body2">
              Forgot your password?
            </MUILink> */}
          </Grid>
          <Typography variant="body2" color="text.secondary" align="center">
            Don't feel like creating and account? Have fun with Finn's account.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Email: finn@imadog.com Password: bark
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}
