import { Route, Routes } from "react-router-dom";
import AddSongPage from "../pages/AddSongPage/AddSongPage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
import ArtistsPage from "../pages/ArtistsPage/ArtistsPage";
import AddArtistPage from "../pages/AddArtistPage/AddArtistPage";
import ArtistPage from "../pages/ArtistPage/ArtistPage";
import DashboardPage from "../pages/AddArtistPage/DashboardPage/Dashboard";
import SignupPage from "../pages/AuthenticationPages/SignUpPage/SignUpPage";
import LoginPage from "../pages/AuthenticationPages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/">
          <Route index element={<ArtistsPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
        </Route>
        <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/add-artist" element={<AddArtistPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;