import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


import { BACKEND_URL } from '../../config/serverConfig';
import PlaylistSong from "../Sidebar/Playlist/PlaylistSong";


function Artist() {
  const { artistId } = useParams();
  const location = useLocation();
  const { artistName, coverImage } = location.state;

  const [artistWithSongs, setArtistWithSongs] = useState({});

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${coverImage}`;


  useEffect(() => {
    const fetchArtistWithSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/artists/${artistId}/songs`);
      const data = await response.json();

      console.log(data);
      setArtistWithSongs(data);
    }

    fetchArtistWithSongs();
  }, []);



  if (!artistWithSongs.songs) {
    return (
      <h1>Loading</h1>
    )
  }


  return (
    <div className="artist-container">
      <div
        className="flex artist-hero"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <h4 className="light-txt">{artistName}</h4>
        <div className="artist-hero-overlay" />
      </div>
      <div className="playlist-wrap">
        {artistWithSongs.songs.map((song) => {
          return (
            <PlaylistSong song={song} />
          )
        })}
      </div>
    </div>
  )
}

export default Artist;