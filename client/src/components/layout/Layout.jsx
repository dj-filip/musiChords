import useAuthContext from "../../hooks/useAuthContext";
import BottomBar from "../BottomBar/BottomBar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {

  const { user } = useAuthContext();

  return (
    <>
      <div className="layout">
        {/* {user && (
          <Topbar />
        )} */}
        <Topbar />
        <div className="main-wrap">
          {children}
        </div>
        <BottomBar />
        {/* {user && (
          <BottomBar />
        )} */}
        {/* <MusicBar>
          <MusicPlayer />
        </MusicBar> */}
      </div>
    </>
  )
}

export default Layout;