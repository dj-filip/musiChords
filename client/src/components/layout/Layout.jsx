import BottomBar from "../BottomBar/BottomBar";
import useAuthContext from "../../hooks/useAuthContext";
import BottomBar from "../Topbar/Topbar";


const Layout = ({ children }) => {

  const { user } = useAuthContext();

  return (
    <>
      <div className="layout">
        {user && (
          <Topbar />
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