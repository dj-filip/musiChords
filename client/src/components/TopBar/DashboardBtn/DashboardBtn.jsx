import { NavLink } from "react-router-dom";
import { useState } from "react";
import FolderIcon from "../../icons/FolderIcon";


function DashboardBtn() {

  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={`dashboard-btn ${isActive ? '' : ''}`}
      >
        <FolderIcon />  

        {showPopupMenu && (
          <div className="add-btn-popup-menu">
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

export default DashboardBtn;