import { useLazyRefreshTokenQuery } from "@/app/services/auth";
import Layout from "@/components/Layout";
import AdminPageWithAuth from "@/components/pages/AdminPage";
import ErrorPage from "@/components/pages/ErrorPage";
import HomePage from "@/components/pages/HomePage";
import ProfilePageWithAuth from "@/components/pages/ProfilePage";
import SearchPage from "@/components/pages/SearchPage";
import AuthPage from "@/features/auth/AuthPage";
import {
  selectCurrentUser,
  selectRefresh,
  setCredentials,
  setRefresh,
} from "@/features/auth/authSlice";
import CollectionPage from "@/features/collection/CollectionPage";
import ItemPage from "@/features/item/ItemPage";
import { setToken } from "@/helpers/auth";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const dispatch = useDispatch();
  const refresh = useSelector(selectRefresh);
  const user = useSelector(selectCurrentUser);
  const [refreshToken, { data, isLoading, error }] = useLazyRefreshTokenQuery();
  useEffect(() => {
    if (refresh && !error) {
      refreshToken();
      toast.info(t("refreshToken"));
      dispatch(setRefresh(false));
    }
    if (error) {
      dispatch(setRefresh(false));
    }
    if (data && !error) {
      setToken(data);
      dispatch(setCredentials(data));
    }
  }, [refresh, data, error]);
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
          <Layout error={error}>
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
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
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
}

export default App;
