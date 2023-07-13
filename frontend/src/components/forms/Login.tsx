// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
// useAppSelector: Select from the state
// useAppDispatch: Dispatch a function like register, or reset
import { login, reset } from '../../features/auth/authSlice'
import { RootState } from '../../app/store'

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
    email: z.string().min(7, { message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(4, { message: 'Passwords must be greater than 4 characters' }),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
      toast.error('Incorrect Credentials')
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
            autoComplete="new-password"
            {...register('password')}
          />
          <div style={{ color: 'red' }}>{errors.password?.message}</div>
        </Grid>
        <Button variant="contained" type="submit" className="btn">
          Login
        </Button>
        <ToastContainer />
      </Grid>
    </Box>
  )
}
