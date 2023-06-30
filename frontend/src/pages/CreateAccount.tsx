import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import SignUp from '../components/forms/SignUp'
import { Grid, Paper } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function CreateAccount(): JSX.Element {
  return (
    <Paper
      elevation={14}
      className="form-container"
      // sx={{
      //   padding: ' 2em',
      //   borderRadius: '30px',
      //   backgroundColor: 'rgba(252, 252, 252, 0.8)',
      // }}
    >
      <Typography variant="h5" component="h5" align="center">
        New Account
      </Typography>

      <SignUp />
    </Paper>
  )
}
