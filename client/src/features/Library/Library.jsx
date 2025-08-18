import { useEffect, useState } from "react";

import { BACKEND_URL } from '../../config/serverConfig';
import LibraryMain from "./LibraryMain/LibraryMain";
import { useLocation } from "react-router-dom";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import useAuthContext from "../../hooks/useAuthContext";
import Song from "../Songs/Song/Song";
import LibrarySidebar from "./LibrarySidebar/LibrarySidebar";

function Library() {

  const location = useLocation();
  const { isMobile } = useBreakpoints();

  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [isSongPanel, setIsSongPanel] = useState(false);

  const [isLibraryMainOpen, setIsLibraryMainOpen] = useState(false);

  const [repertoires, setRepertoires] = useState();
  const [repertoireWithSongs, setRepertoireWithSongs] = useState();
  const [currentRepertoire, setCurrentRepertoire] = useState();

  const [artistWithSongs, setArtistWithSongs] = useState();
  const { artistId } = location.state || {};

  const [currentContextMenu, setCurrentContextMenu] = useState();

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const { user } = useAuthContext();


  const fetchSongs = async () => {
    // const response = await fetch(`${BACKEND_URL}/songs`, {
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`
    //   }
    // });
    const response = await fetch(`${BACKEND_URL}/songs`);
    const data = await response.json();

    console.log(data);
    setSongs(data);
  }



  const fetchRepertoires = async () => {
    // const response = await fetch(`${BACKEND_URL}/repertoires`, {
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`
    //   }
    // });
    const response = await fetch(`${BACKEND_URL}/repertoires`);
    const data = await response.json();

    setRepertoires(data);
  };


  const fetchRepertoireWithSongs = async () => {
    setIsLoading(true);
    //   const response = await fetch(`${BACKEND_URL}/repertoires/${currentRepertoire._id}/songs`, {
    //     headers: {
    //       'Authorization': `Bearer ${user.token}`
    //     }
    // });
    const response = await fetch(`${BACKEND_URL}/repertoires/${currentRepertoire._id}/songs`);
    const data = await response.json();

    // Sorting the `songs` array within each repertoire by the `order` field
    const sortedData = {
      ...data,
      songs: data.songs.sort((a, b) => a.order - b.order)
    };

    setRepertoireWithSongs(sortedData);
    setIsLoading(false);
  }


  const handleSelectRepertoire = (selectedRepertoire) => {
    setCurrentRepertoire(selectedRepertoire);
    setArtistWithSongs(null);
  }


  const fetchArtistWithSongs = async () => {
    setIsPageLoading(true);
    // const response = await fetch(`${BACKEND_URL}/artists/${artistId}/songs`, {
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`
    //   }
    // });
    const response = await fetch(`${BACKEND_URL}/artists/${artistId}/songs`);
    const data = await response.json();

    console.log(data);
    setArtistWithSongs(data);
    setIsPageLoading(false);

  }



  // useEffect(() => {
  //   if (user) {
  //     fetchSongs();
  //     fetchRepertoires();
  //   }
  // }, [user])

  useEffect(() => {
    fetchSongs();
    fetchRepertoires();
  }, []);




  // useEffect(() => {
  //   if (user && currentRepertoire)
  //     fetchRepertoireWithSongs();
  // }, [user, currentRepertoire])

  useEffect(() => {
    if (currentRepertoire)
      fetchRepertoireWithSongs();
  }, [currentRepertoire])


  // useEffect(() => {
  //   if (user && artistId)
  //     fetchArtistWithSongs();
  // }, [user, artistId])

  useEffect(() => {
    if (artistId)
      fetchArtistWithSongs();
  }, [artistId])

  if (!repertoires) {
    return;
  }



  const handleSongPanel = (open = false) => {
    setIsSongPanel((prev) => {
      if (open && prev) return prev;
      return open ? true : !prev
    });
    console.log(isSongPanel)
    console.log(open)
  }

  const handleLibraryMainPanel = () => {
    setIsLibraryMainOpen(prev => !prev);
  }


  if (isPageLoading) {
    return (
      <div></div>
    )
  }

  return (

    <>
      <div className={`library-static-wrap ${isLibraryMainOpen || artistId ? "repertoire-selected" : ""} `}>
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
          handleLibraryMainPanel={handleLibraryMainPanel}
          handleSelectRepertoire={handleSelectRepertoire}
          fetchRepertoires={fetchRepertoires}
          artistWithSongs={artistWithSongs}
          setArtistWithSongs={setArtistWithSongs}
        />
        <LibraryMain
          songs={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          repertoires={repertoires}
          currentRepertoire={currentRepertoire}
          setCurrentRepertoire={setCurrentRepertoire}
          handleLibraryMainPanel={handleLibraryMainPanel}
          repertoireWithSongs={repertoireWithSongs}
          currentContextMenu={currentContextMenu}
          setCurrentContextMenu={setCurrentContextMenu}
          handleSongPanel={handleSongPanel}
          artistWithSongs={artistWithSongs}
          isLoading={isLoading}
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