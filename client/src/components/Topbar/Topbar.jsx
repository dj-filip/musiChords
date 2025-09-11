import { NavLink } from "react-router-dom";
import DashboardBtn from "./DashboardBtn/DashboardBtn";
import ProfileIcon from "../icons/ProfileIcon";
import useLogout from "@features/Auth/hooks/useLogout";
import useAuthContext from "@features/Auth/hooks/useAuthContext";


function Topbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();


  const handleLogout = () => {
    logout();
  }

  console.log(user)

  return (
    <div className="top-bar">
      <NavLink to="/dashboard">
        <DashboardBtn />
      </NavLink>
      <div className="top-bar__auth-wrap flex align-center">
        {user ? (
          <>
            <ProfileIcon />
            <span>{user.email}</span>
            <button onClick={handleLogout} className="auth-btn">Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/sign-up">
              <button className="auth-btn">Sign up</button>
            </NavLink>
            <NavLink to="/log-in">
              <button className="auth-btn">Log in</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Topbar;