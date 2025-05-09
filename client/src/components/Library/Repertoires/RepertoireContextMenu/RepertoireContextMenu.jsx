

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../config/serverConfig";
import RemoveIcon from "../../../icons/RemoveIcon";


function RepertoireContextMenu({
  repertoire,
  currentRepertoire,
  setCurrentRepertoire,
  contextMenuRef,
  contextMenu,
  setContextMenu,
  positionX,
  positionY,
  repertoires,
  setRepertoires
}) {


  const handleRemoveRepertoire = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await fetch(`${BACKEND_URL}/repertoires/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      setRepertoires(prevRepertoires => prevRepertoires.filter(rep => rep._id !== id));
      currentRepertoire?._id === id && setCurrentRepertoire(null);
      setContextMenu({
        position: {
          x: 0,
          y: 0
        },
        toggled: false
      })
      console.log(repertoires);
      console.log('Repertoire removed successfully:', result);
    } catch (err) {
      console.error('Error removing repertoire', err);
    }
  };



  return (
    <>
      <menu
        ref={contextMenuRef}
        className={`repertoire-context-menu ${contextMenu.toggled && 'active-context-menu'}`}
        style={{
          top: positionY + 2 + 'px',
          left: positionX + 2 + 'px'
        }}
      >
        <ul>
          <li>
            <button
              className="light-txt"
              onClick={(e) => handleRemoveRepertoire(e, repertoire._id)}>
              <RemoveIcon
                className="gray-txt"
                width={20}
              />Remove {repertoire.name} Repertoire
            </button>
          </li>
        </ul>
      </menu>
    </>
  )
}


export default RepertoireContextMenu;