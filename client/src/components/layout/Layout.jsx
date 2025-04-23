import MusicPlayer from "../MusicBar/MusicPlayer/MusicPlayer";
import MusicBar from "../MusicBar/MusicBar";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../Topbar/TopBar";


const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <TopBar />
        <div className="main-wrap">
          {children}
        </div>
        <BottomBar />
        {/* <MusicBar>
          <MusicPlayer />
        </MusicBar> */}
      </div>
    </>
  )
}

export default Layout;