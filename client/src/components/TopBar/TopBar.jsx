import { NavLink } from "react-router-dom";
import FolderIcon from "../icons/FolderIcon";
import DashboardBtn from "./DashboardBtn/DashboardBtn";
import ProfileIcon from "../icons/ProfileIcon";


function TopBar() {
  return (
    <div className="top-bar">
      <NavLink to="/dashboard">
        <DashboardBtn />
      </NavLink>
      <div className="flex align-center">
        <ProfileIcon />
        <NavLink to="/sign-up">
          <button>Sign up</button>
        </NavLink>
        <button>Log in</button>
      </div>
    </div>
  )
}

export default TopBar;