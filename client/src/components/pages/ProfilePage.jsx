import { Box, Button, Typography } from "@mui/material";
import Profile from "@/components/Profile";
import Collections from "@/features/collection/Collections";
import { useState } from "react";
import CollectionForm from "@/features/collection/CollectionForm";

const ProfilePage = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Box padding="30px" overflow="auto" height="100%">
        <Typography variant="h2">Profile</Typography>
        <Box m="20px 0">
          <Profile />
          <Typography variant="h3">Your Collections</Typography>
          <Collections variant="profile" />
          <Box mt={2}>
            {openForm ? (
              <CollectionForm setOpenForm={setOpenForm}/>
            ) : (
              <Button onClick={() => setOpenForm(true)}>Add new</Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
