import { useContext, useEffect, useRef, useState } from 'react';
import { PlayingContext } from '../../../contexts/PlayingContext';
import RepertoireContextMenu from '../../Library/Repertoires/RepertoireContextMenu/RepertoireContextMenu';


const PlaylistSong = ({ key, song, onClick, selectedSong, currentContextMenu, setCurrentContextMenu }) => {

  const { setSelectedSongTitle, selectedSongTitle, isHiding, setIsHiding } = useContext(PlayingContext);

  const [isContextMenu, setIsContextMenu] = useState(false);
  const [contextMenuSongId, setContextMenuSongId] = useState();
  const [isActive, setIsActive] = useState(false);


  const currentSong = useRef();

  const handleOnSongChange = () => {
    setIsHiding(false);
    setSelectedSongTitle(currentSong.current.dataset.songTitle);
  }

  useEffect(() => {
    console.log('Selected song link changed:', selectedSongTitle);
    console.log('song link:', song.link);
  }, [selectedSongTitle]);

  const { coverImage: image } = song;


  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${image}`;


  const handleContextMenu = (e, songId) => {
    e.preventDefault();
    setIsContextMenu(true);
    setContextMenuSongId(songId);
    setCurrentContextMenu(songId);
  }




  return (
    <>
      <li
        ref={currentSong}
        // className={`${selectedSongTitle == song.title && "active"}`}
        className={`repertoire-song ${selectedSong._id === song._id ? 'active' : ''}`}
        data-song-id={song._id}
        onClick={onClick}
        onContextMenu={(e) => handleContextMenu(e, song._id)}
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

        {isContextMenu && currentContextMenu === song._id && (
          <RepertoireContextMenu song={song} isContextMenu={isContextMenu} setIsContextMenu={setIsContextMenu} />
        )}
      </li>

    </>
  )

}

export default PlaylistSong;