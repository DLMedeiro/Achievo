import React from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import FinnImage from '../images/finn-welcome.jpg'

export default function FinnModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Avatar
        alt="Finn"
        src={FinnImage}
        sx={{
          width: 80,
          height: 80,
          margin: 'auto',
          border: '2px solid transparent',
          '&:hover': { cursor: 'pointer', border: '2px solid #1e5b5e' },
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="test"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h3" component="h3">
            Hi! I'm Finn.
          </Typography>
          <Typography>Feel free to browse my Dashboard of goals.</Typography>
          <Typography>You can add or edit them too!</Typography>
          <img
            id="modal-description"
            src={FinnImage}
            alt="Finn"
            style={{ width: '100%' }}
          />
        </Box>
      </Modal>
    </div>
  )
}
