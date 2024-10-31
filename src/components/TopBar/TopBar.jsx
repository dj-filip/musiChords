import { NavLink } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import AddIcon from "../icons/AddIcon";
import LibraryIcon from "../icons/LibraryIcon";
import AddBtn from "./AddBtn/AddBtn";


function TopBar() {
  return (
    <header>
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <AddBtn />
      <NavLink to="/library">
        <LibraryIcon />
      </NavLink>
    </header>
  )
}

export default TopBar;