import { FILE_TYPES } from "@/constants/fields";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";

const UploadFile = ({ image, setImage }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const ref = useRef(null);
  return (
    <Box mt={2} width="100%">
      <FileUploader
        handleChange={(file) => setImage(file)}
        name="image"
        types={FILE_TYPES}
        hoverTitle="Drop here"
        fileOrFiles={image}
        children={
          <Box
            sx={(theme) => ({
              border: `1px dashed ${theme.palette.text.secondary}`,
              "&:hover": {
                cursor: "pointer",
              },
            })}
            borderRadius={1}
            p={2}
            display="flex"
            flexWrap="wrap"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display="flex" alignItems={"center"}>
              <CloudUploadIcon sx={{ color: "text.secondary", mr: 3 }} />
              <Typography color="text.primary" variant="h4">
                {t("uploadText")}
              </Typography>
            </Box>
            <Typography color="text.secondary">JPG,JPEG,PNG,GIF</Typography>
          </Box>
        }
      />
      {image && (
        <List
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ color: "text.primary" }}
              primary={image.name}
              secondary={`${t("size")}: ${(image.size / 1024).toFixed(2)} Кб`}
            />
            <IconButton
              aria-label="delete"
              onClick={() => {
                setImage("");
                ref.current.value = null;
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default UploadFile;
