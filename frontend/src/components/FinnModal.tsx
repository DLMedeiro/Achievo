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

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Avatar
        alt="Finn"
        src={FinnImage}
        sx={{
          width: 60,
          height: 60,
          // position: 'fixed',
          // bottom: '2%',
          // left: '5%',
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
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hi! I'm Finn.
          </Typography>
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
