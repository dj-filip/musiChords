import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AddSongPage from "../pages/AddSongPage/AddSongPage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-song" element={<AddSongPage />} />
    </Routes>
  )
}

export default AppRoutes;