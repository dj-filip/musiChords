import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useAuthContext from "@features/Auth/hooks/useAuthContext";

import LibraryMain from "./LibraryMain";
import LibrarySidebar from "./LibrarySidebar";
import Song from "@features/Songs/Song";
import { BACKEND_URL } from "@config/serverConfig";
import { useGetSongsQuery } from "@features/Songs/songsApi";
import { useGetRepertoireSongsQuery, useGetRepertoiresQuery } from "./Repertoires/repertoiresApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRepertoire } from "./Repertoires/repertoireSlice";

function Library() {

  const location = useLocation();

  const [selectedSong, setSelectedSong] = useState({});
  const [isSongPanel, setIsSongPanel] = useState(false);

  const [isLibraryMainOpen, setIsLibraryMainOpen] = useState(false);


  const [artistWithSongs, setArtistWithSongs] = useState();
  const { artistId } = location.state || {};


  const [isPageLoading, setIsPageLoading] = useState(false);


  const { user } = useAuthContext();


  const dispatch = useDispatch();
  const currentRepertoire = useSelector((state) => state.repertoire.currentRepertoire)

  const { data: songs, error: songsError, isLoading: songsLoading } = useGetSongsQuery();
  const { data: repertoires, error: repertoiresError, isLoading: RepertoiresLoading } = useGetRepertoiresQuery();
  const { data: repertoireSongs, error: repretoireSongsError, isLoading: RepertoireSongsLoading } = useGetRepertoireSongsQuery(currentRepertoire?._id, {
    skip: !currentRepertoire?._id
  });


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




  // useEffect(() => {
  //   if (user && currentRepertoire)
  //     fetchRepertoireWithSongs();
  // }, [user, currentRepertoire])



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


  console.log('REPERTOIRES: ', repertoires)

  return (

    <>
      <div className={`library-static-wrap ${isLibraryMainOpen || artistId ? "repertoire-selected" : ""} `}>
        <LibrarySidebar
          repertoires={repertoires}
          repertoireSongs={repertoireSongs}
          handleLibraryMainPanel={handleLibraryMainPanel}
          artistWithSongs={artistWithSongs}
          setArtistWithSongs={setArtistWithSongs}
        />
        <LibraryMain
          songs={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          repertoires={repertoires}
          handleLibraryMainPanel={handleLibraryMainPanel}
          repertoireSongs={repertoireSongs}
          handleSongPanel={handleSongPanel}
          artistWithSongs={artistWithSongs}
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