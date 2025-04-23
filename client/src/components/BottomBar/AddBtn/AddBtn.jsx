import { NavLink } from "react-router-dom";
import AddIcon from "../../icons/AddIcon";
import { useEffect, useRef, useState } from "react";


function AddBtn() {

  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();



  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && 
    buttonRef.current && !buttonRef.current.contains(e.target)) {
      setShowPopupMenu(false);
      setIsActive(false);
    }
  }

  console.log(buttonRef.current)

  useEffect(() => {
    if (showPopupMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopupMenu]);

  return (
    <>
      <button
        ref={buttonRef}
        className={`add-split-btn ${isActive ? 'active' : ''}`}
        onClick={() => {
          setShowPopupMenu((prev) => !prev);
          setIsActive((prev) => !prev)
        }}
      >
        <AddIcon />

        {showPopupMenu && (
          <div ref={menuRef} className="add-btn-popup-menu">
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