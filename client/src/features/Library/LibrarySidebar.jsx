import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import useAuthContext from "@features/Auth/hooks/useAuthContext";
import { useBreakpoints } from "@hooks/useBreakpoints";

import BackIcon from "@components/icons/BackIcon";
import Repertoire from "./Repertoires/Repertoire";
import CreateRepertoire from "./Repertoires/CreateRepertoire";
import CreateRepertoireBtn from "./Repertoires/components/CreateRepertoireBtn";
import RepertoireIcon from "@components/icons/RepertoireIcon";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRepertoire } from "./Repertoires/repertoireSlice";
import { setCurrentArtist } from "@features/Artists/artistSlice";


function LibrarySidebar({
  songs,
  repertoires,
  setRepertoires,
  handleLibraryMainPanel,
  fetchRepertoires,
  artistWithSongs,
  setArtistWithSongs
}) {

  const dispatch = useDispatch();
  const currentRepertoire = useSelector((state) => state.repertoire.currentRepertoire)
  const currentArtist = useSelector((state) => state.artist.currentArtist);

  const [showPopupMenu, setShowPopupMenu] = useState(false);


  const [createRepertoireMenu, setCreateRepertoireMenu] = useState({
    x: 0,
    y: 0
  });

  const createRepertoireRef = useRef();

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}\library-cover_rsaqgz`;


  const { user } = useAuthContext();

  const { isMobile } = useBreakpoints();


  const handleSelectRepertoire = (selectedRepertoire) => {
    dispatch(setCurrentRepertoire(selectedRepertoire));
    dispatch(setCurrentArtist(null));
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
          <NavLink 
            to={-1} 
            className="circle-btn-wrap"
            onClick={() =>  dispatch(setCurrentRepertoire(null))}
            >
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
                handleSelectRepertoire()
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
                handleLibraryMainPanel={handleLibraryMainPanel}
                handleSelectRepertoire={handleSelectRepertoire}
              />
            ))}
          </ul>
        </div>
      </div>

    </>
  );
}

export default LibrarySidebar;