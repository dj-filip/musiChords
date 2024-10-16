import { NavLink } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import AddIcon from "../icons/AddIcon";


function TopBar() {
  return (
    <header>
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <NavLink to="/add-song">
        <AddIcon />
      </NavLink>
    </header>
  )
}

export default TopBar;