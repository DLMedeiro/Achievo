import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { login } from '../features/auth/authSlice'
import FinnModal from '../components/FinnModal'
import CircularIndeterminate from '../components/Spinner'

export default function Home() {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useAppDispatch()

  const loginDemo = () => {
    dispatch(
      login({
        email: 'finn@imadog.com',
        password: 'FinnFinn',
      }),
    )
  }

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Paper elevation={14} className="form-container">
      {user ? (
        <>
          {user._id == '64728b96d38e1251fcc5cc82' ? (
            <>
              <h1>Hi {user.name}</h1>
              <h2>Welcome Back!</h2>
              <FinnModal />
            </>
          ) : (
            <>
              <h1>Hi {user.name}</h1>
              <h2>Welcome Back!</h2>
            </>
          )}
        </>
      ) : (
        <>
          <h1>StartSomewhere</h1>
          <h2>Achieve More, One Step at a Time!</h2>
        </>
      )}

      {user ? (
        <Link to={`/goals/user/${user._id}`}>
          <Button variant="contained" id="btn-pair">
            Go to my dashboard
          </Button>
        </Link>
      ) : (
        <>
          <Link to="login">
            <Button variant="contained" id="btn-pair">
              Log In
            </Button>
          </Link>

          <Button onClick={loginDemo} variant="contained" id="btn-pair">
            Try out a demo
          </Button>
        </>
      )}
    </Paper>
  )
}
