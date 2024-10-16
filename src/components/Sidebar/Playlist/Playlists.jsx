import FolderIcon from "../../icons/FolderIcon";


const playlists = ["Balada", "Rock"];


const Playlists = ({ onSelectPlaylist }) => {


  return (
    playlists.map((playlist) => {
      return (
        <li 
          onClick={() => onSelectPlaylist(playlist)}
        >
          <div className="playlist-icon-wrap">
            <FolderIcon />
          </div>
          <div className="flex-1">
            <h5 className="light-txt">{playlist}</h5>
          </div>
        </li>
      )
    })
  )
}

export default Playlists;