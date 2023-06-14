import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "@/components/Layout";
import AuthPage from "@/components/pages/AuthPage";
import HomePage from "@/components/pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage variant="login" />} />
          <Route path="/register" element={<AuthPage variant="register" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
