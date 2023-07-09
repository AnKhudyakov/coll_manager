import { useGetUserByIdQuery } from "@/app/services/user";
import Layout from "@/components/Layout";
import AdminPage from "@/components/pages/AdminPage";
import HomePage from "@/components/pages/HomePage";
import ProfilePage from "@/components/pages/ProfilePage";
import SearchPage from "@/components/pages/SearchPage";
import AuthPage from "@/features/auth/AuthPage";
import { setCredentials } from "@/features/auth/authSlice";
import CollectionPage from "@/features/collection/CollectionPage";
import ItemPage from "@/features/item/ItemPage";
import { getToken, getUserId } from "@/helpers/auth";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    error,
  } = getUserId() ? useGetUserByIdQuery(getUserId()) : "";
  useEffect(() => {
    if (user) {
      dispatch(setCredentials({ user, token: getToken() }));
    }
  }, [user]);
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <BrowserRouter>
      <Layout error={error}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage variant="login" />} />
          <Route path="/register" element={<AuthPage variant="register" />} />
          <Route path="/forgot" element={<AuthPage variant="forgot" />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
