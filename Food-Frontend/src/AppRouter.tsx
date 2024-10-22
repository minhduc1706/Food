import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/detail/:restaurantId" element={<DetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        </Route>
        <Route path="/test" element={<LoadingSpinner/>}/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
