import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AddSongPage from "@pages/AddSongPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import DashboardPage from "@pages/Dashboard";
import ArtistPage from "@pages/ArtistPage";
import ArtistsPage from "@pages/ArtistsPage";
import LibraryPage from "@pages/LibraryPage";
import AddArtistPage from "@pages/AddArtistPage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/log-in" element={<LoginPage />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/">
          <Route index element={<ArtistsPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
        </Route>
        <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/add-artist" element={<AddArtistPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      {/* </Route> */}
    </Routes>
  )
}

export default AppRoutes;