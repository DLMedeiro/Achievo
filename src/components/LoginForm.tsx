import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import SignUp from './SignUp'
import { Grid, Paper } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Don't feel like actually logging in? Have fun with Finn's account. Email:
      finn@imadog.com Password: bark
    </Typography>
  )
}

export default function LoginForm(): JSX.Element {
  return (
    <>
      <Grid container spacing={3} sx={{ padding: '78px 0' }}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper
            elevation={14}
            sx={{ padding: '36px 46px', borderRadius: '30px' }}
            MuiPaper-rounded
          >
            <Typography component="p" sx={{ marginBottom: '20px' }}>
              Log in to be amused for a couple minutes
            </Typography>
            <SignUp />
            <Grid
              container
              justifyContent="center"
              sx={{ marginBottom: '12px' }}
            >
              <Link href="#" variant="body2">
                Forgot your password?
              </Link>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  )
}
