import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
