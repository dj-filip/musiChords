import { useEffect, useRef, useState } from "react";


function useContextMenu() {

  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0
    },
    toggled: false
  })

  const contextMenuRef = useRef();


  const handleContextMenu = (e, songId) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();

    const isLeft = e.clientX < window?.innerWidth / 2;

    let x
    let y = e.clientY;

    if (isLeft) {
      x = e.clientX;
    } else {
      x = e.clientX - contextMenuAttr.width;
    }

    setContextMenu({
      position: {
        x: x,
        y: y
      },
      toggled: true
    });


    console.log(x)
    console.log(y)
    console.log(contextMenu.position.x)
    console.log(contextMenu.position.y)
  }



  const handleClickOutside = (e) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      setContextMenu({
        position: {
          x: 0,
          y: 0
        },
        toggled: false
      });
    }
  }


  useEffect(() => {
    if (contextMenu.toggled) {
      document.addEventListener("mousedown", handleClickOutside);
      console.log("EVENT LISTENER ADD")
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("EVENT LISTENER")
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contextMenu]);

  return [contextMenu, setContextMenu, contextMenuRef, handleContextMenu]
}


export default useContextMenu;