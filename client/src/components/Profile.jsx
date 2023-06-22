import { Typography } from "@mui/material";

const Profile = ({user}) => {
  return (
    <>
      <Typography gutterBottom variant="h2">Profile</Typography>
      <Typography gutterBottom variant="h3">Hello, {user?.username}!</Typography>
    </>
  );
};

export default Profile;
