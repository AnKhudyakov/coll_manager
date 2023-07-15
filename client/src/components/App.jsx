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
import { getToken } from "@/helpers/auth";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = getToken() ? useRefreshQuery() : "";
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data]);
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
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
