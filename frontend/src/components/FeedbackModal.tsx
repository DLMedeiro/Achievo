import React from "react";

import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
// import FinnImage from "../images/finn-welcome.jpg";
import Button from "@mui/material/Button";
import Feedback from "./forms/feedbackForm";

interface FeedbackModalProps {
  style: React.CSSProperties;
}

export default function FeedbackModal(props: FeedbackModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={props.style}
        // sx={{ my: 2, color: { color }, display: "block" }}
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
        // className="test"
      >
        <Box className="modal">
          <Feedback onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
