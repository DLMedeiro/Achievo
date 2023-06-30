// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
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
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import { RootState } from '../../app/store'

// const theme = createTheme()

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#f6e4d9',
//       light: '#6189c2',
//       dark: '#2f2d13',
//     },
//   },
// })

export default function Login() {
  type Inputs = {
    email: string
    password: string
  }
  const InitialFormValues = {
    email: '',
    password: '',
  }
  const schema = z.object({
    email: z.string().min(7, { message: 'Email is required' }),
    password: z.string().min(4, { message: 'Please Enter a password' }),
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
    if (isSuccess && user) {
      navigate(`/goals/user/${user._id}`)
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
    const userData = {
      email: data.email,
      password: data.password,
    }
    dispatch(login(userData))
  }

  // Add error handling within the signup form
  return (
    // <ThemeProvider theme={theme}>

    <Box
      component="form"
      className="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      // sx={{
      //   mt: 3,
      //   marginBottom: '12px',
      // }}
    >
      <Grid
        container
        spacing={0}
        // sx={{
        //   marginBottom: '16px',
        //   paddingLeft: 0,
        //   paddingRight: 0,
        //   minWidth: '250px',
        // }}
      >
        <Grid
          item
          xs={12}
          // sx={{ marginBottom: '26px' }}
        >
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email')}
          />
          <div style={{ color: 'red' }}>{errors.email?.message}</div>
        </Grid>
        <Grid
          item
          xs={12}
          //  sx={{ marginBottom: '26px' }}
        >
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password')}
          />
          <div style={{ color: 'red' }}>{errors.password?.message}</div>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          className="btn"
          // sx={{
          //   mt: 3,
          //   mb: 2,
          //   width: '100%',
          //   borderRadius: '40px',
          //   margin: '0 auto',
          //   display: 'flex',
          //   color: '#2f2d13',
          //   backgroundColor: '#f6cdfe',
          //   '&:hover': {
          //     backgroundColor: '#f9f9f9',
          //     color: '#2f2d13',
          //     cursor: 'pointer',
          //   },
          // }}
        >
          Login
        </Button>
        {/* <p>{loginStatus}</p> */}
      </Grid>
    </Box>

    // </ThemeProvider>
  )
}
