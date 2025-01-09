import { Route, Routes } from "react-router-dom";
import AddSongPage from "../pages/AddSongPage/AddSongPage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
import ArtistsPage from "../pages/ArtistsPage/ArtistsPage";
import AddArtistPage from "../pages/AddArtistPage/AddArtistPage";
import ArtistPage from "../pages/ArtistPage/ArtistPage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ArtistsPage />} /> 
        <Route path="/artist/:artistId" element={<ArtistPage />} />
      </Route>
      <Route path="/add-song" element={<AddSongPage />} />
      <Route path="/add-artist" element={<AddArtistPage />} />
      <Route path="/library" element={<LibraryPage />} />
    </Routes>
  )
}

export default AppRoutes;