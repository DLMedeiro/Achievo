// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
// useAppSelector: Select from the state
// useAppDispatch: Dispatch a function like register, or reset
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, reset } from '../../features/auth/authSlice'
import { RootState } from '../../app/store'
import Spinner from '../Spinner'

// const theme = createTheme()

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

export default function SignUp() {
  type Inputs = {
    name: string
    email: string
    password: string
    password2: string
  }
  const InitialFormValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
  }

  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(7, { message: 'Email is required' }),
    password: z.string().min(4, { message: 'Please Enter a password' }),
    password2: z.string().min(4, { message: 'Please re-enter password' }),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: InitialFormValues,
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      }
      dispatch(registerUser(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3, marginBottom: '12px' }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: '16px',
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: '250px',
              }}
            >
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoComplete="name"
                  {...register('name')}
                />
                <div style={{ color: 'red' }}>{errors.name?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email')}
                />
                <div style={{ color: 'red' }}>{errors.email?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <div style={{ color: 'red' }}>{errors.password?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password2"
                  placeholder="Re-Enter your password"
                  {...register('password2')}
                />
                <div style={{ color: 'red' }}>{errors.password2?.message}</div>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '40px',
                  margin: '0 auto',
                  display: 'flex',
                }}
              >
                Create Account
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
