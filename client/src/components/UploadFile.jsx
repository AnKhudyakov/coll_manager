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
} from "@mui/material";
import { useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadFile = ({ image, setImage }) => {
  const ref = useRef(null);
  return (
    <Box mt={2} width="100%">
      {/* <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        p={"20px"}
        sx={{
          width: "100%",
          p: "20px",
          marginRight: "1rem",
          mt: 2,
          bgcolor: "transparent",
          border: "1px dashed grey",
        }}
      >
        Upload or drop image file
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={ref}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button> */}
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
