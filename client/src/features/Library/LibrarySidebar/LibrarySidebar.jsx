import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import Repertoire from "../Repertoires/Repertoire";

import CreateRepertoire from "../Repertoires/CreateRepertoire/CreateRepertoire";
import CreateRepertoireBtn from "../Repertoires/CreateRepertoire/CreateRepertoireBtn/CreateRepertoireBtn";

import useAuthContext from "../../../hooks/useAuthContext";
import { useBreakpoints } from "../../../hooks/useBreakpoints";
import BackIcon from "../../../components/icons/BackIcon";
import RepertoireIcon from "../../../components/icons/RepertoireIcon";

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
  handleLibraryMainPanel,
  handleSelectRepertoire,
  fetchRepertoires,
  artistWithSongs,
  setArtistWithSongs
}) {

  const [showPopupMenu, setShowPopupMenu] = useState(false);


  const [createRepertoireMenu, setCreateRepertoireMenu] = useState({
    x: 0,
    y: 0
  });

  const createRepertoireRef = useRef();

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}\library-cover_rsaqgz`;


  const { user } = useAuthContext();

  const { isMobile } = useBreakpoints();



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
          <ul>
            <li
              className={`library-item ${!currentRepertoire && !artistWithSongs && !isMobile && "active"}`}
              onClick={() => {
                setCurrentRepertoire(null)
                setArtistWithSongs(null)
                handleLibraryMainPanel(true)
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="repertoire-icon-wrap">
                <RepertoireIcon />
              </div>
              <div className="flex-1">
                <h5 className="light-txt">All Songs</h5>
              </div>
            </li>

            {repertoires.map((repertoire) => (
              <Repertoire
                key={repertoire.id}
                repertoire={repertoire}
                onClick={handleSelectRepertoire}
                repertoires={repertoires}
                setRepertoires={setRepertoires}
                currentRepertoire={currentRepertoire}
                setCurrentRepertoire={setCurrentRepertoire}
                handleLibraryMainPanel={handleLibraryMainPanel}
              />
            ))}
          </ul>
        </div>
      </div>

    </>
  );
}

export default LibrarySidebar;