import MusicPlayer from "../MusicBar/MusicPlayer/MusicPlayer";
import MusicBar from "../MusicBar/MusicBar";
import TopBar from "../TopBar/TopBar";


const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <div className="main-wrap">
          {children}
        </div>
        <TopBar />
        {/* <MusicBar>
          <MusicPlayer />
        </MusicBar> */}
      </div>
    </>
  )
}

export default Layout;