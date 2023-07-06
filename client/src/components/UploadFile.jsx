import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FILE_TYPES } from "@/constants/fields";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadFile = ({ image, setImage }) => {
  const ref = useRef(null);
  return (
    <Box mt={2} width="100%">
      <FileUploader
        handleChange={(file) => setImage(file)}
        name="image"
        types={FILE_TYPES}
        hoverTitle="Drop here"
        fileOrFiles={image}
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
              primary={image.name}
              secondary={`size:${(image.size / 1024).toFixed(2)} Кб`}
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
