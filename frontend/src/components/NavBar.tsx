import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
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
    window.location.reload()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => navigate('/')}
            size="small"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <ThumbUpOffAltIcon
              sx={{
                padding: '10px',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#f6cdfe',
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Start Somewhere
          </Typography>
          {user ? (
            <Stack direction="row" spacing={3}>
              <Button
                onClick={logoutUser}
                color="inherit"
                sx={{
                  borderLeft: '5px solid transparent',
                  '&:hover': {
                    borderLeft: '5px solid #f6cdfe',
                  },
                }}
              >
                Logout
              </Button>
              <Button
                onClick={() => navigate(`/goals/user/${user._id}`)}
                color="inherit"
                sx={{
                  borderLeft: '5px solid transparent',
                  '&:hover': {
                    borderLeft: '5px solid #f6cdfe',
                  },
                }}
              >
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
              <Button
                onClick={() => navigate('/login')}
                color="inherit"
                sx={{
                  borderLeft: '5px solid transparent',
                  '&:hover': {
                    borderLeft: '5px solid #f6cdfe',
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
