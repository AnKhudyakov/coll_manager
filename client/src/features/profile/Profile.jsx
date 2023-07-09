import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { DEFAULT_AVATAR_URL } from "@/constants/imageUrl";
import { useState } from "react";
import ProfileForm from "./ProfileForm";

const Profile = ({ user }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          pr: 3,
        }}
      >
        <CardMedia
          component="img"
          image={DEFAULT_AVATAR_URL}
          alt="Collection image"
          sx={{ height: "150px", width: "30%", objectFit: "contain" }}
        />
        <CardContent sx={{ width: "100%", height: "100%" }}>
          <Typography gutterBottom variant="h3" component="div">
            {t("username")}: {user?.username}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            {t("email")}: {user?.email}
          </Typography>
        </CardContent>
        <Box>
          <Box>
            <IconButton aria-label="edit" onClick={() => setOpenForm(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      {openForm && (
        <ProfileForm
          username={user.username}
          setOpenForm={setOpenForm}
          email={user.email}
          userId={user._id}
        />
      )}
    </>
  );
};

export default Profile;
