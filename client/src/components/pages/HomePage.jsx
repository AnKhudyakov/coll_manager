import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Collections from "@/features/collection/Collections";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <section>
      <Box p={3} pt="70px">
        <Typography variant="h3">Popular</Typography>
        <Box m="20px 0">
          <Collections variant="popular" />
        </Box>
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
