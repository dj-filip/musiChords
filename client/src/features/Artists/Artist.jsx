import { NavLink } from "react-router-dom";
import PlaylistSong from "../../components/Sidebar/Playlist/PlaylistSong";
import BackIcon from "../../components/icons/BackIcon";

function Artist({ artist, selectedSong, setSelectedSong }) {

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${artist.coverImage}`;

  return (
    <div className="artist-container">
      <div
        className="flex flex-column hero artist-hero"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <NavLink to="/" className="circle-btn-wrap">
          <BackIcon />
        </NavLink>
        <h4 className="light-txt">{artist.name}</h4>
        <div className="artist-hero-overlay" />
      </div>
      <div className="playlist-wrap">
        {artist.songs.map((song) => {
          return (
            <PlaylistSong
              key={song._id}
              song={song}
              selectedSong={selectedSong}
              onClick={() => setSelectedSong(song)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Artist;