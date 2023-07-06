import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Profile = ({ user }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  return (
    <>
      <Typography gutterBottom variant="h2" color="text.secondary">
        {t("profile")}
      </Typography>
      <Typography gutterBottom variant="h3" color="text.secondary">
        {t("username")}: {user?.username}
      </Typography>
    </>
  );
};

export default Profile;
