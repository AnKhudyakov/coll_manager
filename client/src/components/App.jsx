import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "@/components/Layout";
import AuthPage from "@/features/auth/AuthPage";
import HomePage from "@/components/pages/HomePage";
import ProfilePage from "@/components/pages/ProfilePage";
import CollectionPage from "@/features/collection/CollectionPage";
import ItemPage from "@/features/item/ItemPage";
import SearchPage from "@/components/pages/SearchPage";
import { useEffect } from "react";
import { getToken, getUserId } from "@/helpers/auth";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetUserByIdQuery } from "@/app/services/user";
import { Box, CircularProgress } from "@mui/material";
import AdminPage from "@/components/pages/AdminPage";

function App() {
  const dispatch = useDispatch();
  const { data: user, isLoading } = getUserId()
    ? useGetUserByIdQuery(getUserId())
    : "";
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
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage variant="login" />} />
          <Route path="/register" element={<AuthPage variant="register" />} />
          <Route path="/profile/:id" element={<ProfilePage/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
