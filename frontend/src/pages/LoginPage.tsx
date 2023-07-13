import { Link } from 'react-router-dom'
import Login from '../components/forms/Login'
import { Paper } from '@mui/material'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularIndeterminate from '../components/Spinner'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'

export default function LoginForm(): JSX.Element {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Paper elevation={14} className="form-container">
      <Typography variant="h5" component="h5" align="center">
        Start Somewhere.
      </Typography>
      <Typography variant="h6" component="h6" align="center">
        Start Now.
      </Typography>
      <Login />
      <Link to="/createAccount">
        <Button variant="contained" className="btn">
          Create Account
        </Button>
      </Link>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ marginTop: '1rem' }}
      >
        Don't feel like creating an account?
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Have fun with Finn's.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Email: finn@imadog.com
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        Password: FinnFinn
      </Typography>
    </Paper>
  )
}
