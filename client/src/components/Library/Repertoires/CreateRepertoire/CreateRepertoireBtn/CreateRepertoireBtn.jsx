import { useEffect, useRef } from "react";
import PlusIcon from "../../../../icons/PlusIcon";


function CreateRepertoireBtn({ showPopupMenu, setShowPopupMenu, setCreateRepertoireMenu, createRepertoireMenu, createRepertoireRef }) {

  const buttonRef = useRef();

  const handleCreateRepertoireDropdown = () => {
    const createBtnPosition = buttonRef.current.getBoundingClientRect();
    setCreateRepertoireMenu({
      x: createBtnPosition.x,
      y: createBtnPosition.y
    })

    setShowPopupMenu((prev) => !prev);
  }

  const handleClickOutside = (e) => {
    console.log("CREATE REPERTOIRE REF: ", createRepertoireRef)
    if (createRepertoireRef.current && !createRepertoireRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
      setShowPopupMenu(false);
    }
  }


   useEffect(() => {
      if (showPopupMenu) {
        document.addEventListener("mousedown", handleClickOutside);
        console.log("EVENT LISTENER ADD")
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        console.log("EVENT LISTENER")
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPopupMenu]);


  return (
    <button 
      ref={buttonRef}
      className={`new-repertoire-btn circle-btn-wrap ${showPopupMenu && 'create-repertoire-active-btn'} `}
      // onClick={() => setShowPopupMenu((prev) => !prev)}
      onClick={(e) => handleCreateRepertoireDropdown(e)}  
    >
      <PlusIcon />
    </button>
  )

}

export default CreateRepertoireBtn;