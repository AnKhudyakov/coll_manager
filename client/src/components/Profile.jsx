import { Typography } from "@mui/material";

const Profile = ({user}) => {
  return (
    <>
      <Typography gutterBottom variant="h2" color="text.secondary">Profile</Typography>
      <Typography gutterBottom variant="h3" color="text.secondary">Username: {user?.username}</Typography>
    </>
  );
};

export default Profile;
