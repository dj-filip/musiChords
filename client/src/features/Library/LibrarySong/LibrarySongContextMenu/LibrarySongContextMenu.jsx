

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../config/serverConfig";
import PlusIcon from "../../../../components/icons/PlusIcon";
import RemoveIcon from "../../../../components/icons/RemoveIcon";


function LibrarySongContextMenu({
  song,
  setCurrentRepertoire,
  currentRepertoire,
  contextMenuRef,
  contextMenu,
  setContextMenu,
  positionX,
  positionY,
  repertoires
}) {

  const handleAddSongToRepertoire = async (e, selectedRepertoireId, song) => {
    e.stopPropagation()
    const repertoireSongData = {
      songId: song._id
    }

    try {
      const response = await fetch(`${BACKEND_URL}/repertoires/${selectedRepertoireId}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(repertoireSongData),
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setContextMenu({
        position: {
          x: 0,
          y: 0
        },
        toggled: false
      })
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  }


  const handleRemoveSongFromRepertoire = async (e, currentRepertoire, song) => {
    e.stopPropagation()
    try {
      const response = await fetch(`${BACKEND_URL}/repertoires/${currentRepertoire._id}/songs/${song._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log("CURRENT REPERTOIRE: ", currentRepertoire)
      setCurrentRepertoire((prevRepertoire) => ({
        ...prevRepertoire,
        songs: prevRepertoire.songs.filter((s) => s._id !== song._id),
      }))
      setContextMenu({
        position: {
          x: 0,
          y: 0
        },
        toggled: false
      })
      console.log('Song removed from repertoire successfully:', result);
    } catch (err) {
      console.error('Error removing song from repertoire:', err);
    }
  }



  return (
    <>
      {currentRepertoire ? (
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
                onClick={(e) => handleRemoveSongFromRepertoire(e, currentRepertoire, song)}>
                <RemoveIcon
                  className="gray-txt"
                  width={20}
                /> Remove from {currentRepertoire.name} Repertoire
              </button>
            </li>
          </ul>
        </menu>
      ) : (
        <menu
          className={`repertoire-context-menu ${contextMenu.toggled && 'active-context-menu'}`}
          style={{
            top: positionY + 2 + 'px',
            left: positionX + 2 + 'px'
          }}
          ref={contextMenuRef}
        >
          <h4>Add to Repertoire</h4>
          <ul>
            {repertoires?.map((repertoire) => {
              return (
                <li>
                  <button
                    className="light-txt"
                    onClick={(e) => handleAddSongToRepertoire(e, repertoire._id, song)}>
                    <PlusIcon className="plus-icon-gray"/> {repertoire.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </menu>
      )}
    </>
  )
}

export default LibrarySongContextMenu;