

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../config/serverConfig";


function RepertoireContextMenu({ song }) {

  const [repertoires, setRepertoires] = useState();
  const [selectedRepertoireId, setSelectedRepertoireId] = useState();
  const [addToPlaylistPopup, setAddToPlaylistPopup] = useState(false);

  const fetchRepertoires = async () => {
    const response = await fetch(`${BACKEND_URL}/repertoires/getRepertoires`);
    const data = await response.json();

    setRepertoires(data);
  };

  useEffect(() => {
    fetchRepertoires();
  }, [])

  

  const handleAddToPlaylist = async (selectedRepertoireId) => {
    // e.preventDefault();

    const repertoireSongData = {
      repertoireId: selectedRepertoireId,
      songId: song._id
    }


    try {
      const response = await fetch(`${BACKEND_URL}/repertoires/addSongToRepertoire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(repertoireSongData),
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setAddToPlaylistPopup(false)
      fetchRepertoires();
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  }

  return (
    <>
      <menu className="repertoire-context-menu">
        <ul>
          <li>
            <button onClick={() => setAddToPlaylistPopup(true)}>Add to Playlist</button>
          </li>
        </ul>
      </menu>

      {addToPlaylistPopup && (
        <div className="new-repertoire-popup-container">
          <menu className="new-repertoire-popup">
            <ul>
              {repertoires.map((repertoire) => {
                return (
                  <li>
                    <button onClick={() => handleAddToPlaylist(repertoire._id)}>{repertoire.name}</button>
                  </li>
                )
              })}
            </ul>
          </menu>
        </div>
      )}

    </>
  )
}


export default RepertoireContextMenu;