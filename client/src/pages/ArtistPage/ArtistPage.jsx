import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import Artist from "../../components/Artists/Artist";
import Song from "../../components/Songs/Song/Song";

import { BACKEND_URL } from '../../config/serverConfig';



function ArtistPage() {


  const { artistId } = useParams();
  const location = useLocation();
  const { artistName, coverImage } = location.state;

  const [artistWithSongs, setArtistWithSongs] = useState({});

  const [selectedSong, setSelectedSong] = useState({});


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
    <>
      <Artist artist={artistWithSongs} setSelectedSong={setSelectedSong} />

      {
        selectedSong && (
          <Song selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
        )
      }
    </>
  )
}

export default ArtistPage;