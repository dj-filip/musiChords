import { useContext, useState } from "react";
import { PlayingContext } from "../../contexts/PlayingContext";

import Playlists from "./Playlist/Playlists";
import Playlist from "./Playlist/Playlist";
import PlaylistSong from "./Playlist/PlaylistSong";



const Sidebar = () => {

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const { songs } = useContext(PlayingContext);

  const handleSelectPlaylist = (playlistName) => {
    setCurrentPlaylist(playlistName);
  }

  const handleBack = () => {
    setCurrentPlaylist(null);
  }

  if (!songs) {
    return (
      <h1>Loading</h1>
    )
  }


  return (
    <div className="padding-wrap">
      <section className="sidebar">
        <ul>
          {currentPlaylist ? (
            <Playlist
              currentPlaylist={currentPlaylist}
              onBack={handleBack}
            />
          ) : (
            <>
              {/* <Playlists onSelectPlaylist={handleSelectPlaylist} /> */}
              {songs.map((song) => {
                return (
                  <PlaylistSong
                    song={song}
                  />
                )
              })}
            </>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Sidebar;