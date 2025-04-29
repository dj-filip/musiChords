import { useEffect, useState } from "react";
import Song from "../../components/Songs/Song/Song";
import Library from "../../components/Library/Library";


import { BACKEND_URL } from '../../config/serverConfig';
import useAuthContext from "../../hooks/useAuthContext";


function LibraryPage() {

  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/songs/getSongs`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();

      console.log(data);
      setSongs(data);
    }

    if (user) {
      fetchSongs();
    }
  }, [user]);


  return (
    <>
      <Library songs={songs} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
      <Song selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
    </>
  )
  
}

export default LibraryPage;