import { useContext, useEffect, useRef } from 'react';
import { PlayingContext } from '../../../contexts/PlayingContext';


const PlaylistSong = ({ song }) => {

  const { setSelectedSongTitle, selectedSongTitle, isHiding, setIsHiding } = useContext(PlayingContext);

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


  return (
    <li
      ref={currentSong}
      className={`${selectedSongTitle == song.title && "active"}`}
      data-song-title={song.title}
      onClick={handleOnSongChange}
    >
      <img src={imageUrl} alt="cover-img" className="song-cover-img" />
      <div className="flex-1">
        <h5 className="light-txt">{song.title}</h5>
        <h6>{song.artist}</h6>
      </div>
      <div className="song-key-wrap">
        <div>
           <h5>Am</h5> {/*Saved Key */}
        </div>
        <div>
          <h5>{song.originalKey}<sup>®</sup></h5>
        </div>
      </div>
    </li>
  )
}

export default PlaylistSong;