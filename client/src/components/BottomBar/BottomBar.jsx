import { NavLink } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import AddIcon from "../icons/AddIcon";
import LibraryIcon from "../icons/LibraryIcon";
import AddBtn from "./AddBtn/AddBtn";


function BottomBar() {
  return (
    <div className="bottom-bar">
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <AddBtn className="bottom-bar-nav-icon-wrap" />
      <NavLink to="/library">
        <LibraryIcon />
      </NavLink>
    </div>
  )
}

export default BottomBar;