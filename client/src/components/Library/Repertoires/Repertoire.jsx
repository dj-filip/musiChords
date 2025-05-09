import useContextMenu from "../../../hooks/useContextMenu";
import RepertoireIcon from "../../icons/RepertoireIcon";
import RepertoireContextMenu from "./RepertoireContextMenu/RepertoireContextMenu";


const Repertoire = ({
  repertoire,
  onClick,
  repertoires,
  setRepertoires,
  currentRepertoire,
  setCurrentRepertoire
}) => {

  const [contextMenu, setContextMenu, contextMenuRef, handleContextMenu] = useContextMenu();

  const handleRepertoireContextMenu = (e, id) => {
    e.preventDefault();
    setIsContextMenu(true);
    setContextMenuSongId(songId);
    setCurrentContextMenu(songId);
  }

  return (
    <>
      <li
        className={`library-item ${currentRepertoire?._id === repertoire._id ? "active" : ""}`}
        onClick={() => onClick(repertoire)}
        onContextMenu={(e) => handleContextMenu(e, repertoire._id)}
      >
        <div className="repertoire-icon-wrap">
          <RepertoireIcon />
        </div>
        <div className="flex-1">
          <h5 className="light-txt">{repertoire.name}</h5>
        </div>

        <RepertoireContextMenu
          repertoire={repertoire}
          contextMenuRef={contextMenuRef}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          repertoires={repertoires}
          setRepertoires={setRepertoires}
          currentRepertoire={currentRepertoire}
          setCurrentRepertoire={setCurrentRepertoire}
        />
      </li>
    </>
  )
}

export default Repertoire;