import { NavLink } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import AddIcon from "../icons/AddIcon";
import LibraryIcon from "../icons/LibraryIcon";


function TopBar() {
  return (
    <header>
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <NavLink to="/add-song">
        <AddIcon />
      </NavLink>
      <NavLink to="/add-artist">
        <AddIcon />
      </NavLink>
      <NavLink to="/library">
        <LibraryIcon />
      </NavLink>
    </header>
  )
}

export default TopBar;