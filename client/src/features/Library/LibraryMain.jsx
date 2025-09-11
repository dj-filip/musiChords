import { useEffect, useRef, useState } from "react";
import LibrarySong from "./LibrarySong";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsQuery } from "@features/Songs/songsApi";
import { setCurrentArtist } from "@features/Artists/artistSlice";


function LibraryMain({
  selectedSong,
  setSelectedSong,
  repertoires,
  handleSongPanel,
  repertoireSongs,
  artistWithSongs,
  isLoading
}) {

  const location = useLocation();
  const dispatch = useDispatch();

  const currentRepertoire = useSelector((state) => state.repertoire.currentRepertoire);
  const currentArtist = useSelector((state) => state.artist.currentArtist);


  useEffect(() => {
    dispatch(setCurrentArtist(location.state?.artistId));
  },[])


  const queryArgs = currentArtist
    ? { artistId: currentArtist }
    : currentRepertoire?._id
      ? { repertoireId: currentRepertoire._id }
      : {};




  const libraryMainSongsWrapRef = useRef();


  const [isScroled, setIsScroled] = useState(false);


  let librarySongs = [];
  let headerTitle = "All Songs";

  // if (artistWithSongs) {
  //   librarySongs = artistWithSongs.songs;
  //   headerTitle = artistWithSongs.name;
  // } else if (currentRepertoire) {
  //   librarySongs = repertoireSongs?.songs.map(s => s.song) || [];
  //   headerTitle = currentRepertoire.name;
  //   console.log(repertoireSongs)
  // } else {
  //   librarySongs = songs;
  //   headerTitle = "All Songs";
  // }


  const { data: songs, errors: songsError, isLoading: songsLoading } = useGetSongsQuery(queryArgs);

  function normalizeSongs(data) {
    if (data?.songs?.[0]?.song) {
      return data.songs.map(s => s.song) ?? [];
    } else if (data?.songs) {
      return data.songs;
    }
    return data ?? [];
  }

  console.log("SONGS DATA", songs)

  const libraryMainSongs = normalizeSongs(songs);



  useEffect(() => {

    if (libraryMainSongsWrapRef.current) {
      const libraryMainSongsWrap = libraryMainSongsWrapRef.current;


      const handleScroll = () => {
        setIsScroled(libraryMainSongsWrap.scrollTop > 1);
        console.log(libraryMainSongsWrap.scrollTop)
      }

      if (libraryMainSongsWrap.scrollHeight > libraryMainSongsWrap.clientHeight) {
        libraryMainSongsWrap.addEventListener('scroll', handleScroll);
      } else {
        setIsScroled(false);
      }


      return () => {
        libraryMainSongsWrap.removeEventListener('scroll', handleScroll);
        console.log("UNMONUNTED")
      }
    }
  }, [librarySongs]);

  if (isLoading) {
    return (
      <div className="library-main-container"></div>
    )
  }

  return (
    <div
      className="library-main-container"
    >

      <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}>
        <Link to="/" className="back-btn-wrap">
          <div className="arrow-left-icon" />
        </Link>
        <h1>{headerTitle}</h1>
      </div>
      <div
        className="library-main__songs-wrap"
        ref={libraryMainSongsWrapRef}
      >
        {libraryMainSongs?.map((song) => (

          <LibrarySong
            onClick={(e) => {
              if (e.target.tagName === 'BUTTON') return;
              setSelectedSong(song);
            }}
            key={song.id}
            song={song}
            selectedSong={selectedSong}
            repertoires={repertoires}
            handleSongPanel={handleSongPanel}
          />
        )
        )}
      </div>
    </div >
  )
}

export default LibraryMain;