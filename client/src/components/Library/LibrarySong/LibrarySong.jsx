import { useContext, useEffect, useRef, useState } from 'react';
import { PlayingContext } from '../../../contexts/PlayingContext';
import LibrarySongContextMenu from './LibrarySongContextMenu/LibrarySongContextMenu';
import useContextMenu from '../../../hooks/useContextMenu';


function LibrarySong({
  key,
  song,
  onClick,
  selectedSong,
  currentContextMenu,
  setCurrentContextMenu,
  currentRepertoire,
  setCurrentRepertoire,
  repertoires,
  handleSongPanel
}) {

  const [contextMenu, setContextMenu, contextMenuRef, handleContextMenu] = useContextMenu();

  const { setSelectedSongTitle, selectedSongTitle, isHiding, setIsHiding } = useContext(PlayingContext);

  const currentSong = useRef();

  const { coverImage: image } = song;
  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${image}`;



  useEffect(() => {
  }, [selectedSongTitle]);



  const handleOnSongChange = () => {
    setIsHiding(false);
    setSelectedSongTitle(currentSong.current.dataset.songTitle);
  }


  return (
    <>
      <li
        ref={currentSong}
        // className={`${selectedSongTitle == song.title && "active"}`}
        className={`library-item ${selectedSong._id === song._id ? 'active' : ''}`}
        data-song-id={song._id}
        onClick={(e) => {
          onClick(e),
            handleSongPanel(true)
        }}
        onContextMenu={(e) => {
            e.preventDefault(),
            handleContextMenu(e, song._id)
        }}
      >
        <img src={imageUrl} alt="cover-img" className="song-cover-img" />
        <div className="flex-1">
          <h5 className="light-txt">{song.title}</h5>
          <h6>{song.artist}</h6>
        </div>
        <div className="song-key-wrap">
          {/* Saved Key */}
          {/* <div>
           <h5>Am</h5>
        </div> */}
          <div>
            <h5>{song.originalKey}<sup>®</sup></h5>
          </div>
        </div>

        <LibrarySongContextMenu
          song={song}
          contextMenuRef={contextMenuRef}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          currentRepertoire={currentRepertoire}
          setCurrentRepertoire={setCurrentRepertoire}
          repertoires={repertoires}
        />
      </li>
    </>
  )

}

export default LibrarySong;