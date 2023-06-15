import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "@/components/Layout";
import Auth from "@/features/auth/Auth";
import HomePage from "@/components/pages/HomePage";
import ProfilePage from "@/components/pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth variant="login" />} />
          <Route path="/register" element={<Auth variant="register" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
