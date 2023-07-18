import { useRefreshQuery } from "@/app/services/auth";
import Layout from "@/components/Layout";
import AdminPageWithAuth from "@/components/pages/AdminPage";
import HomePage from "@/components/pages/HomePage";
import ProfilePageWithAuth from "@/components/pages/ProfilePage";
import SearchPage from "@/components/pages/SearchPage";
import AuthPage from "@/features/auth/AuthPage";
import { setCredentials } from "@/features/auth/authSlice";
import CollectionPage from "@/features/collection/CollectionPage";
import ItemPage from "@/features/item/ItemPage";
import { getRefreshToken } from "@/helpers/auth";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRefresh, selectRelogin } from "@/features/auth/authSlice";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const refreshToken = getRefreshToken();
  const dispatch = useDispatch();
  const refresh = useSelector(selectRefresh);
  const { data, isLoading, error, refetch } = refreshToken
    ? useRefreshQuery()
    : {};
  useEffect(() => {
    if (refresh) {
      refetch();
      toast(t("refreshToken"));
    }
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [refresh, data]);
  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100vh"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <BrowserRouter>
          <Layout isLoading={isLoading}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthPage variant="login" />} />
              <Route
                path="/register"
                element={<AuthPage variant="register" />}
              />
              <Route path="/forgot" element={<AuthPage variant="forgot" />} />
              <Route path="/profile/:id" element={<ProfilePageWithAuth />} />
              <Route path="/admin" element={<AdminPageWithAuth />} />
              <Route path="/collections/:id" element={<CollectionPage />} />
              <Route path="/items/:id" element={<ItemPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
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
    </>
  );
}

export default App;
