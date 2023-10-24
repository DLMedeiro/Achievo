import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
// import FinnImage from "../images/finn-welcome.jpg";
import Button from "@mui/material/Button";
import Feedback from "./forms/feedbackForm";

export default function FeedbackModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Feedback
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="test"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h3" component="h3">
            Hi! I'm Finn.
          </Typography>
          <Feedback />
        </Box>
      </Modal>
    </div>
  );
}
