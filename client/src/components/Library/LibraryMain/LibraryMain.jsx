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
  repertoireWithSongs
}) {
  return (
    <div className="library-main-container">

      {currentRepertoire ?
        (
          <>
            <h1>{currentRepertoire.name}</h1>
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
            <h1>All Songs</h1>
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