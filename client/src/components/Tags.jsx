import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Tags = ({ tags }) => {
  const navigate = useNavigate();
  return (
    <>
      {tags?.map((tag) => (
        <Button
          sx={{
            m: 1,
            bgcolor: "background.main",
            color: "text.secondary",
          }}
          key={tag._id}
          onClick={() => navigate(`/search?text=${tag.content}`)}
        >
          #{tag.content}
        </Button>
      ))}
    </>
  );
};

export default Tags;
