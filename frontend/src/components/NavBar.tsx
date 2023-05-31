import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import { RootState } from '../app/store'

import { useNavigate } from 'react-router-dom'

import MoodBadIcon from '@mui/icons-material/MoodBad'
export default function NavBar() {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={() => navigate('/')}
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
        >
          <MoodBadIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Boredly
        </Typography>
        {user ? (
          <Stack direction="row" spacing={3}>
            <Button onClick={logoutUser} color="inherit">
              Logout
            </Button>
            <Button onClick={() => navigate('/activities')} color="inherit">
              Activities
            </Button>
            <Button onClick={() => navigate('/news')} color="inherit">
              News
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={3}>
            <Button onClick={() => navigate('/login')} color="inherit">
              Login
            </Button>
            <Button onClick={() => navigate('/activities')} color="inherit">
              Activities
            </Button>
            <Button onClick={() => navigate('/news')} color="inherit">
              News
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
