import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import useAuthContext from "@features/Auth/hooks/useAuthContext";

import LibraryMain from "./LibraryMain";
import LibrarySidebar from "./LibrarySidebar";
import Song from "@features/Songs/Song";
import { BACKEND_URL } from "@config/serverConfig";
import { useGetSongsQuery } from "@features/Songs/songsApi";
import { useGetRepertoireSongsQuery, useGetRepertoiresQuery } from "./Repertoires/repertoiresApi";
import { useDispatch, useSelector } from "react-redux";


function Library() {

  const location = useLocation();

  const [selectedSong, setSelectedSong] = useState({});
  const [isSongPanel, setIsSongPanel] = useState(false);

  const [isLibraryMainOpen, setIsLibraryMainOpen] = useState(false);


  const { artistId } = location.state || {};


  const [isPageLoading, setIsPageLoading] = useState(false);


  const { user } = useAuthContext();


  const { data: repertoires, error: repertoiresError, isLoading: RepertoiresLoading } = useGetRepertoiresQuery();



  // useEffect(() => {
  //   if (user) {
  //     fetchSongs();
  //     fetchRepertoires();
  //   }
  // }, [user])




  // useEffect(() => {
  //   if (user && currentRepertoire)
  //     fetchRepertoireWithSongs();
  // }, [user, currentRepertoire])



  // useEffect(() => {
  //   if (user && artistId)
  //     fetchArtistWithSongs();
  // }, [user, artistId])



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


  console.log('REPERTOIRES: ', repertoires)


  return (

    <>
      <div className={`library-static-wrap ${isLibraryMainOpen || artistId ? "repertoire-selected" : ""} `}>
        <LibrarySidebar
          repertoires={repertoires}
          handleLibraryMainPanel={handleLibraryMainPanel}
        />
        <LibraryMain
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          repertoires={repertoires}
          handleLibraryMainPanel={handleLibraryMainPanel}
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