import SignUp from '../components/forms/SignUp'
import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
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
