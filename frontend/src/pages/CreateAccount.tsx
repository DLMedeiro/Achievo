import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import SignUp from '../components/forms/SignUp'
import { Grid, Paper } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { RootState } from '../app/store'
import CircularIndeterminate from '../components/Spinner'
import { useAppSelector } from '../app/hooks'

export default function CreateAccount(): JSX.Element {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Paper elevation={14} className="form-container">
      <Typography variant="h5" component="h5" align="center">
        New Account
      </Typography>

      <SignUp />
    </Paper>
  )
}
