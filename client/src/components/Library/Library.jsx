import { useEffect, useState } from "react";
import Song from "../../components/Songs/Song/Song";
import LibrarySidebar from "../../components/Library/LibrarySidebar/LibrarySidebar";


import { BACKEND_URL } from '../../config/serverConfig';
import useAuthContext from "../../hooks/useAuthContext";
import LibraryMain from "./LibraryMain/LibraryMain";


function Library() {

  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [isSongPanel, setIsSongPanel] = useState(false);

  const [repertoires, setRepertoires] = useState();
  const [repertoireWithSongs, setRepertoireWithSongs] = useState();
  const [currentRepertoire, setCurrentRepertoire] = useState();

  const [currentContextMenu, setCurrentContextMenu] = useState();



  const { user } = useAuthContext();


  const fetchSongs = async () => {
    const response = await fetch(`${BACKEND_URL}/songs`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    console.log(data);
    setSongs(data);
  }



  const fetchRepertoires = async () => {
    const response = await fetch(`${BACKEND_URL}/repertoires`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    setRepertoires(data);
  };


  const fetchRepertoireWithSongs = async () => {
    const response = await fetch(`${BACKEND_URL}/repertoires/${currentRepertoire._id}/songs`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    // Sorting the `songs` array within each repertoire by the `order` field
    const sortedData = {
      ...data,
      songs: data.songs.sort((a, b) => a.order - b.order)
    };

    setRepertoireWithSongs(sortedData);
  }


  const handleSelectRepertoire = (selectedRepertoire) => {
    setCurrentRepertoire(selectedRepertoire);
  }

  useEffect(() => {
    if (user) {
      fetchSongs();
      fetchRepertoires();
    }
  }, [user])


  useEffect(() => {
    if (user && currentRepertoire)
      fetchRepertoireWithSongs();
  }, [user, currentRepertoire])

  if (!repertoires) {
    return;
  }



  const handleSongPanel = ( open = false ) => {
    setIsSongPanel((prev) => {
      if (open && prev) return prev;
      return open ? true : !prev
    });
    console.log(isSongPanel)
    console.log(open)
  }

  return (
    <>
      <div className="library-static-wrap">
        <LibrarySidebar
          songs={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          repertoires={repertoires}
          setRepertoires={setRepertoires}
          repertoireWithSongs={repertoireWithSongs}
          setRepertoireWithSongs={setRepertoireWithSongs}
          currentRepertoire={currentRepertoire}
          setCurrentRepertoire={setCurrentRepertoire}
          handleSelectRepertoire={handleSelectRepertoire}
          fetchRepertoires={fetchRepertoires}
        />
        <LibraryMain
          songs={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          repertoires={repertoires}
          currentRepertoire={currentRepertoire}
          repertoireWithSongs={repertoireWithSongs}
          currentContextMenu={currentContextMenu}
          setCurrentContextMenu={setCurrentContextMenu}
          handleSongPanel={handleSongPanel}
        />
      </div>
      <Song
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        isSongPanel={isSongPanel}
        handleSongPanel={handleSongPanel}
      />
    </>
  )

}

export default Library;