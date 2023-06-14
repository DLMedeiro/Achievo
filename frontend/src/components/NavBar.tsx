import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import FinnModal from '../components/FinnModal'

import { useNavigate } from 'react-router-dom'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
export default function NavBar() {
  interface userState {
    user: any
  }
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth,
  )
  const { user }: userState = useAppSelector((state: RootState) => state.auth)
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
          <ThumbUpOffAltIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Achievo
        </Typography>
        {user ? (
          <Stack direction="row" spacing={3}>
            <Button onClick={logoutUser} color="inherit">
              Logout
            </Button>
            <Button onClick={() => navigate('/activities')} color="inherit">
              Goals
            </Button>
            {user._id == '64728b96d38e1251fcc5cc82' ? (
              <Button color="inherit">
                <FinnModal />
              </Button>
            ) : (
              ''
            )}
          </Stack>
        ) : (
          <Stack direction="row" spacing={3}>
            <Button onClick={() => navigate('/login')} color="inherit">
              Login
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
