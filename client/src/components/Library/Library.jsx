import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Repertoire from "./Repertoires/Repertoire";
import LibrarySong from "./LibrarySong/LibrarySong";

import CreateRepertoire from "./Repertoires/CreateRepertoire/CreateRepertoire";

import BackIcon from "../icons/BackIcon";
import CreateRepertoireBtn from "./Repertoires/CreateRepertoire/CreateRepertoireBtn/CreateRepertoireBtn";

import { BACKEND_URL } from '../../config/serverConfig';


function Library({ songs, selectedSong, setSelectedSong }) {

  const [repertoires, setRepertoires] = useState();
  const [currentRepertoire, setCurrentRepertoire] = useState();
  const [showPopupMenu, setShowPopupMenu] = useState(false);

  const [currentContextMenu, setCurrentContextMenu] = useState();

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}\library-cover_rsaqgz`;

  const [repertoireWithSongs, setRepertoireWithSongs] = useState();



  const fetchRepertoires = async () => {
    const response = await fetch(`${BACKEND_URL}/repertoires`);
    const data = await response.json();

    setRepertoires(data);
  };


  const fetchRepertoireWithSongs = async () => {
    const response = await fetch(`${BACKEND_URL}/repertoires/${currentRepertoire._id}/songs`);
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
    fetchRepertoires();
  }, [])


  useEffect(() => {
    if (currentRepertoire)
      fetchRepertoireWithSongs();
  }, [currentRepertoire])

  if (!repertoires) {
    return;
  }


  return (
    <>
      <div className="artist-container">
        <div
          className="flex flex-column hero library-hero"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        >
          {currentRepertoire ? (
            <>
              <button className="circle-btn-wrap" onClick={() => setCurrentRepertoire(null)}>
                <BackIcon />
              </button>
              <div className="library-heading-wrap flex just-between">
                <h4 className="light-txt">{currentRepertoire.name}</h4>
                {/* <CreateRepertoireBtn setShowPopupMenu={setShowPopupMenu} /> */}
              </div>
              <div className="artist-hero-overlay" />
            </>
          ) : (
            <>
              <NavLink to={-1} className="circle-btn-wrap">
                <BackIcon />
              </NavLink>
              <div className="library-heading-wrap flex just-between">
                <h4 className="light-txt">Library</h4>
                <CreateRepertoireBtn setShowPopupMenu={setShowPopupMenu} />
              </div>
              <div className="artist-hero-overlay" />
            </>
          )}
        </div>

        <div className="repertoire-wrap">
          {currentRepertoire ?
            (
              repertoireWithSongs?.songs.map(({ song }) => {
                return (
                  <LibrarySong
                    onClick={(e) => {
                      if (e.target.tagName === 'BUTTON') return;
                      setSelectedSong(song);
                    }}
                    key={song.id}
                    song={song}
                    selectedSong={selectedSong}
                    setCurrentContextMenu={setCurrentContextMenu}
                    currentContextMenu={currentContextMenu}
                    setCurrentRepertoire={setCurrentRepertoire}
                    currentRepertoire={currentRepertoire}
                  />
                )
              })
            ) : (
              <>
                {repertoires.map((repertoire) => (
                  <Repertoire
                    key={repertoire.id}
                    repertoire={repertoire}
                    onClick={handleSelectRepertoire}
                    repertoires={repertoires}
                    setRepertoires={setRepertoires}
                  />
                ))}

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
                  />
                ))}
              </>
            )}
        </div>
      </div>

      {showPopupMenu && (
        <CreateRepertoire
          setShowPopupMenu={setShowPopupMenu}
          fetchRepertoires={fetchRepertoires}
        />
      )}
    </>
  );
}

export default Library;