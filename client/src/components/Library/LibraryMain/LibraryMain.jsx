import { useEffect, useRef, useState } from "react";
import Song from "../../Songs/Song/Song";
import LibrarySong from "../LibrarySong/LibrarySong";


function LibraryMain({
  songs,
  selectedSong,
  setSelectedSong,
  repertoires,
  currentContextMenu,
  setCurrentContextMenu,
  handleSongPanel,
  currentRepertoire,
  repertoireWithSongs,
  artistWithSongs,
  isLoading
}) {

  const libraryMainRef = useRef();

  const [isScroled, setIsScroled] = useState(false);

  useEffect(() => {
    const libraryMain = libraryMainRef.current;

    const handleScroll = () => {
      setIsScroled(libraryMain.scrollTop > 1);
      console.log(libraryMain.scrollTop)
    }

    libraryMain.addEventListener('scroll', handleScroll);

    return () => {
      libraryMain.removeEventListener('scroll', handleScroll);
      console.log("UNMONUNTED")
    }
  }, []);

  if (isLoading) {
    return (
      <div className="library-main-container"></div>
    )
  }

  console.log(isScroled);

  return (
    <div
      ref={libraryMainRef}
      className="library-main-container"
    >

      {artistWithSongs ?
        (
          <>
            <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}><h1>{artistWithSongs.name}</h1></div>
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
          </>
        ) : currentRepertoire ?
          (
            <>
              <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}><h1>{currentRepertoire.name}</h1></div>
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
            </>
          ) : (
            <>
              <div className={`library-main-header ${isScroled ? "library-main-header-sticky" : ""}`}><h1>All Songs</h1></div>
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
            </>
          )
      }

    </div>
  )
}

export default LibraryMain;