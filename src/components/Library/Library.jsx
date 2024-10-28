import { NavLink } from "react-router-dom";
import PlaylistSong from "../Sidebar/Playlist/PlaylistSong";
import BackIcon from "../icons/BackIcon";



function Library({ songs, setSelectedSong }) {

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}\library-cover_rsaqgz`;

  return (
    <div className="artist-container">
      <div
        className="flex flex-column hero library-hero"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <NavLink to="/" className="back-btn-wrap">
          <BackIcon />
        </NavLink>
        <h4 className="light-txt">Library</h4>
        <div className="artist-hero-overlay" />
      </div>
      <div className="playlist-wrap">
        {songs.map((song) => {
          return (
            <PlaylistSong song={song} onClick={() => setSelectedSong(song)} />
          )
        })}
      </div>
    </div>
  )
}

export default Library;