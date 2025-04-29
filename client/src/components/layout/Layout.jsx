import MusicPlayer from "../MusicBar/MusicPlayer/MusicPlayer";
import MusicBar from "../MusicBar/MusicBar";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../Topbar/TopBar";
import useAuthContext from "../../hooks/useAuthContext";


const Layout = ({ children }) => {

  const { user } = useAuthContext();

  return (
    <>
      <div className="layout">
        {user && (
          <TopBar />
        )}
        <div className="main-wrap">
          {children}
        </div>
        {user && (
          <BottomBar />
        )}
        {/* <MusicBar>
          <MusicPlayer />
        </MusicBar> */}
      </div>
    </>
  )
}

export default Layout;