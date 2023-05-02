import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import MoodBadIcon from '@mui/icons-material/MoodBad'
export default function NavBar() {
  const navigate = useNavigate()

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
      </Toolbar>
    </AppBar>
  )
}
