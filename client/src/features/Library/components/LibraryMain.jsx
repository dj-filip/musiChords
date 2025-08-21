import { useEffect, useRef, useState } from "react";
import LibrarySong from "./LibrarySong";
import { Link, useNavigate } from "react-router-dom";


function LibraryMain({
  songs,
  selectedSong,
  setSelectedSong,
  repertoires,
  currentContextMenu,
  setCurrentContextMenu,
  handleSongPanel,
  currentRepertoire,
  setCurrentRepertoire,
  handleLibraryMainPanel,
  repertoireWithSongs,
  artistWithSongs,
  isLoading
}) {

  // const [LibrarySongs, setLibrarySongs] = useState();

  const libraryMainSongsWrapRef = useRef();


  const [isScroled, setIsScroled] = useState(false);

  const navigate = useNavigate();

  let librarySongs = [];
  let headerTitle = "All Songs";

  if (artistWithSongs) {
    librarySongs = artistWithSongs.songs;
    headerTitle = artistWithSongs.name;
  } else if (currentRepertoire) {
    librarySongs = repertoireWithSongs?.songs.map(s => s.song) || [];
    headerTitle = currentRepertoire.name;
  } else {
    librarySongs = songs;
    headerTitle = "All Songs";
  }

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

  console.log(isScroled);

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
        {librarySongs.map((song) => (

          <LibrarySong
            onClick={(e) => {
              if (e.target.tagName === 'BUTTON') return;
              setSelectedSong(song);
            }}
            key={song.id}
            song={song}
            selectedSong={selectedSong}
            currentContextMenu={currentContextMenu}
            setCurrentContextMenu={setCurrentContextMenu}
            repertoires={repertoires}
            handleSongPanel={handleSongPanel}
          />
        )
        )}
      </div>

      {/* {artistWithSongs ?
        (
          <>
            <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}>
              <Link to="/" className="back-btn-wrap">
                <div className="arrow-left-icon" />
              </Link>
              <h1>{artistWithSongs.name}</h1>
            </div>
            <div
              className="library-main__songs-wrap"
              ref={libraryMainSongsWrapRef}
            >
              {artistWithSongs?.songs.map((song) => (

                <LibrarySong
                  onClick={(e) => {
                    if (e.target.tagName === 'BUTTON') return;
                    setSelectedSong(song);
                  }}
                  key={song.id}
                  song={song}
                  selectedSong={selectedSong}
                  currentContextMenu={currentContextMenu}
                  setCurrentContextMenu={setCurrentContextMenu}
                  repertoires={repertoires}
                  handleSongPanel={handleSongPanel}
                />
              )
              )}
            </div>
          </>
        ) : currentRepertoire ? (
          <>
            <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}>
              <button className="back-btn-wrap" onClick={() => {
                handleLibraryMainPanel(false),
                  setCurrentRepertoire(null)
              }
              }>
                <div className="arrow-left-icon" />
              </button>
              <h1>{currentRepertoire === "all" ? "All Songs" : currentRepertoire?.name}</h1>
            </div>
            <div
              className="library-main__songs-wrap"
              ref={libraryMainSongsWrapRef}
            >
              {repertoireWithSongs?.songs.map(({ song }) => (
                <LibrarySong
                  onClick={(e) => {
                    if (e.target.tagName === 'BUTTON') return;
                    setSelectedSong(song);
                  }}
                  key={song.id}
                  song={song}
                  selectedSong={selectedSong}
                  currentContextMenu={currentContextMenu}
                  setCurrentContextMenu={setCurrentContextMenu}
                  repertoires={repertoires}
                  handleSongPanel={handleSongPanel}
                />
              )
              )}
            </div>
          </>
        ) : (
          <>
            <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}>
              <button className="back-btn-wrap" onClick={() =>
                handleLibraryMainPanel(false)
              }>
                <div className="arrow-left-icon" />
              </button>
              <h1>All Songs</h1>
            </div>
            <div
              className="library-main__songs-wrap"
              ref={libraryMainSongsWrapRef}
            >
              {songs.map((song) => (
                <LibrarySong
                  onClick={(e) => {
                    if (e.target.tagName === 'BUTTON') return;
                    setSelectedSong(song);
                  }}
                  key={song.id}
                  song={song}
                  selectedSong={selectedSong}
                  currentContextMenu={currentContextMenu}
                  setCurrentContextMenu={setCurrentContextMenu}
                  repertoires={repertoires}
                  handleSongPanel={handleSongPanel}
                />
              ))}
            </div>
          </>
        )
      } */}

    </div >
  )
}

export default LibraryMain;