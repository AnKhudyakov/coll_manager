import { DEFAULT_AVATAR_URL } from "@/constants/imageUrl";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProfileForm from "./ProfileForm";
import { ExportToCsv } from "export-to-csv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user, collections }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const [openForm, setOpenForm] = useState(false);
  const handleCSV = () => {
    if (collections?.length) {
      const data = collections;
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Collections CSV",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(data);
      toast.success(t("successDownload"));
    } else {
      toast.error(t("errorDownload"));
    }
  };
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
          <Typography
            gutterBottom
            variant="body"
            component="div"
            color="text.secondary"
          >
            {t("email")}: {user?.email}
          </Typography>
          <Button
            sx={{
              mt: 2,
              px: 2,
              bgcolor: "background.main",
              color: "text.secondary",
            }}
            onClick={handleCSV}
          >
            {t("downloadCollection")}
          </Button>
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
        <>
          <Typography variant="h3" color="text.primary" mt={3}>
            {t("userFormTitle")}
          </Typography>
          <ProfileForm
            username={user.username}
            setOpenForm={setOpenForm}
            email={user.email}
            userId={user._id}
          />
        </>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Profile;
