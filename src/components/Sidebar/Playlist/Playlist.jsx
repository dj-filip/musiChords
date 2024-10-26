import { useContext } from "react";
import PlaylistSong from "./PlaylistSong"
import { PlayingContext } from "../../../contexts/PlayingContext";


const Playlist = ({ currentPlaylist, onBack }) => {

  const { songs } = useContext(PlayingContext);

  const playlistSongs = songs.filter(song => song.playlist.toLowerCase() === currentPlaylist.toLowerCase());


  return (
    <>
      <div className="playlist-top-wrap">
        <button className="back-btn-wrap" onClick={onBack}>
          <div className="arrow-left-icon" />
        </button>
        <h3>{currentPlaylist}</h3>
      </div>
      {playlistSongs.map((song) => {
        return (
          <PlaylistSong song={song} />
        )
      })}
    </>
  )
}

export default Playlist;