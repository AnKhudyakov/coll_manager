import { Box, Typography } from "@mui/material";
import Profile from "@/components/Profile";

const ProfilePage = () => {
  return (
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Box padding="30px" overflow="auto" height="100%">
        <Typography variant="h3">Profile</Typography>
        <Box m="20px 0">
          <Profile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
