import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import Repertoire from "../Repertoires/Repertoire";
import LibrarySong from "../LibrarySong/LibrarySong";

import CreateRepertoire from "../Repertoires/CreateRepertoire/CreateRepertoire";

import BackIcon from "../../icons/BackIcon";
import CreateRepertoireBtn from "../Repertoires/CreateRepertoire/CreateRepertoireBtn/CreateRepertoireBtn";

import { BACKEND_URL } from '../../../config/serverConfig';
import useAuthContext from "../../../hooks/useAuthContext";


function LibrarySidebar({
  songs,
  selectedSong,
  setSelectedSong,
  repertoires,
  setRepertoires,
  repertoireWithSongs,
  setRepertoireWithSongs,
  currentRepertoire,
  setCurrentRepertoire,
  handleSelectRepertoire,
  fetchRepertoires
}) {

  const [showPopupMenu, setShowPopupMenu] = useState(false);


  const [createRepertoireMenu, setCreateRepertoireMenu] = useState({
    x: 0,
    y: 0
  });

  const createRepertoireRef = useRef();

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}\library-cover_rsaqgz`;


  const { user } = useAuthContext();



  return (
    <>
      <div className="artist-container">
        <div
          className="flex flex-column hero library-hero"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        >
          <NavLink to={-1} className="circle-btn-wrap">
            <BackIcon />
          </NavLink>
          <div className="library-heading-wrap flex just-between">
            <h4 className="light-txt">Library</h4>
            <CreateRepertoireBtn
              showPopupMenu={showPopupMenu}
              setShowPopupMenu={setShowPopupMenu}
              createRepertoireMenu={createRepertoireMenu}
              setCreateRepertoireMenu={setCreateRepertoireMenu}
              createRepertoireRef={createRepertoireRef}
            // onClick={onClick}
            />
            {showPopupMenu && (
              <CreateRepertoire
                setShowPopupMenu={setShowPopupMenu}
                positionX={createRepertoireMenu.x}
                positionY={createRepertoireMenu.y}
                createRepertoireMenu={createRepertoireMenu}
                fetchRepertoires={fetchRepertoires}
                createRepertoireRef={createRepertoireRef}
              />
            )}
          </div>
          <div className="artist-hero-overlay" />
        </div>
        <div className="repertoire-wrap">
          {repertoires.map((repertoire) => (
            <Repertoire
              key={repertoire.id}
              repertoire={repertoire}
              onClick={handleSelectRepertoire}
              repertoires={repertoires}
              setRepertoires={setRepertoires}
            />
          ))}
        </div>
      </div>

    </>
  );
}

export default LibrarySidebar;