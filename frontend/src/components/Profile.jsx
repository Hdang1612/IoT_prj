import { Modal, Box, Typography, Avatar, IconButton, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import BrushIcon from '@mui/icons-material/Brush';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ open, handleClose, profile }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{fontSize:20}} />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar
            src={profile.avatar}
            alt="Profile Picture"
            sx={{ width: 120, height: 120 }}
          />
          <Typography fontSize="2.2rem" fontWeight="bold">
            {profile.name}
          </Typography>
          <Typography color="text.secondary" fontSize="1.8rem">
            Mã sinh viên: {profile.studentId}
          </Typography>

          <Box display="flex" gap={3} mt={2}>
            <Link href={profile.github} target="_blank" color="inherit">
              <GitHubIcon fontSize="large" />
            </Link>
            <Link href={profile.facebook} target="_blank" color="inherit">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href={profile.twitter} target="_blank" color="inherit">
              <BrushIcon fontSize="large" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
