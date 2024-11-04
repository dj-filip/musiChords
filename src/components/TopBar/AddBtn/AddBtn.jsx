import { NavLink } from "react-router-dom";
import AddIcon from "../../icons/AddIcon";
import { useState } from "react";


function AddBtn() {

  const [showPopupMenu, setShowPopupMenu] = useState(false);

  return (
    <>
      <button
        className="add-split-btn"
        onClick={() => setShowPopupMenu((prev) => !prev)}
      >
        <AddIcon />

        {showPopupMenu && (
          < div className="add-btn-popup-menu">
            <ul>
              <li>
                <NavLink to="/add-song">Add Song</NavLink>
              </li>
              <li>
                <NavLink to="/add-artist">Add Artist</NavLink>
              </li>
            </ul>
          </div>
        )}
      </button >

    </>
  )
}

export default AddBtn;