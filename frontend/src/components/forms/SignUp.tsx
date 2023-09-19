// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
// useAppSelector: Select from the state
// useAppDispatch: Dispatch a function like register, or reset
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { registerUser, reset } from '../../features/auth/authSlice'
import { RootState } from '../../app/store'

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
    email: z.string().email().min(7, { message: 'Email is required' }),
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
      console.log(message)
      toast.error(
        'Please select a different email.  The email entered is already connected to an account',
      )
    }
    if (isSuccess && user) {
      navigate(`/`)
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

  return (
    <Box
      component="form"
      className="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            id="name"
            label="Name"
            autoComplete="name"
            {...register('name')}
          />
          <div style={{ color: 'red' }}>{errors.name?.message}</div>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          <div style={{ color: 'red' }}>{errors.password?.message}</div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            label="Password"
            type="password"
            id="password2"
            placeholder="Re-Enter your password"
            {...register('password2')}
          />
          <div style={{ color: 'red' }}>{errors.password2?.message}</div>
        </Grid>
        <Button
          className="btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Account
        </Button>
        <ToastContainer />
      </Grid>
    </Box>
  )
}
