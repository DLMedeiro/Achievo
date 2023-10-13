import * as React from 'react'
import './styles/Material.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Logo from '../images/LOGO.png'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'

function ResponsiveAppBar() {
  const { user }: userState = useAppSelector((state: RootState) => state.auth)

  interface userState {
    user: any
  }

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toDashboard = () => {
    navigate(`/goals/user/${user._id}`)
  }

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }

  const loginDemo = () => {
    dispatch(
      login({
        email: 'finn@imadog.com',
        password: 'FinnFinn',
      }),
    )
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        {/* Full Window Start */}
        <Toolbar disableGutters>
          <img src={Logo} className="logo" onClick={() => navigate('/')} />
          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StartSomewhere
          </Typography>
          {/* Full Window End */}
          {/* Small Window Start */}

          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StartSomewhere
          </Typography>
          {/* Small Window End */}
          {/* Full Window Start */}
          {!user ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' },
              }}
            >
              <Button
                key="login"
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
              <Button
                key="createAccount"
                onClick={() => navigate('/createAccount')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Create Account
              </Button>
              <Button
                key="Demo"
                onClick={loginDemo}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Demo
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' },
              }}
            ></Box>
          )}

          {/* Full Window End */}
          {/* Small Window Start*/}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar id="avatar">{user.name.charAt(0)} </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem key="login" onClick={handleCloseNavMenu}>
                    <Button onClick={() => navigate('/login')}>Login</Button>
                  </MenuItem>
                  <MenuItem key="createAccount" onClick={handleCloseNavMenu}>
                    <Button onClick={() => navigate('/createAccount')}>
                      Create Account
                    </Button>
                  </MenuItem>
                  <MenuItem key="demo" onClick={handleCloseNavMenu}>
                    <Button onClick={loginDemo}>Demo</Button>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {/* Small Window End */}
            {/* Full Window Start */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                <Button onClick={toDashboard}>Dashboard</Button>
              </MenuItem>
              <MenuItem key="logout" onClick={handleCloseUserMenu}>
                <Button onClick={logoutUser}>Logout</Button>
              </MenuItem>
            </Menu>
            {/* Full Window End */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
