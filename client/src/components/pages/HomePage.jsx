import { useEffect, useState } from "react";
import { API } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Collections from "@/components/Collections/Collections";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    // API.getCollections()
    //   .then((data) => {
    //     setCollections(data);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  }, []);
  return (
    <section>
      <Box p={3} pt="70px">
        <Typography>Collections</Typography>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default HomePage;
