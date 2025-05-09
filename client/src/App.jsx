import { useEffect, useState } from 'react';


import { PlayingContext } from './contexts/PlayingContext';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import { BACKEND_URL } from './config/serverConfig';
import { AuthContextProvider } from './contexts/AuthContext';
import useAuthContext from './hooks/useAuthContext';


let currentSongAudio;

const App = () => {

  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selectedSongTitle, setSelectedSongTitle] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [isHiding, setIsHiding] = useState(false);


  // useEffect(() => {

  //   const fetchData = async () => {
  //     const result = await fetch(`${BACKEND_URL}/songs/getSongs`, {
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     });
  //     const data = await result.json();

  //     setSongs(data);
  //   }

  //   fetchData();


  //   if (selectedSongTitle) {
  //     currentSongAudio?.pause();
  //     currentSongAudio = new Audio(selectedSongTitle);
  //     // currentSongAudio.play();
  //     setPlaying(false);
  //     const filteredSong = songs.find(song => song.title === selectedSongTitle);
  //     setSelectedSong({
  //       title: filteredSong?.title,
  //       artist: filteredSong?.artist,
  //       originalKey: filteredSong?.originalKey,
  //       intro: filteredSong?.intro,
  //       lyricsChords: filteredSong?.lyricsChords,
  //       coverImage: filteredSong?.coverImage,
  //     });
  //     ("SELECTED SONG CHORDS: " + selectedSong.title)
  //   }

  // }, [selectedSongTitle]);


  // useEffect(() => {
  //   if (selectedSong.title) {
  //     console.log("SELECTED SONG TITLE: " + selectedSong.title);
  //   }
  // }, [selectedSong]);



  // const handleOnPlay = () => {
  //   if (selectedSongTitle) {
  //     setPlaying(playing => !playing);
  //     if (!playing) {
  //       currentSongAudio.play();
  //     } else {
  //       currentSongAudio.pause();
  //     }
  //   }
  // }

  return (
    <Router>
      <AuthContextProvider>
        {/* <PlayingContext.Provider value={{ playing, setPlaying, handleOnPlay, selectedSongTitle, setSelectedSongTitle, songs, selectedSong, setSelectedSong, isHiding, setIsHiding }}> */}
          <Layout>
            <AppRoutes />
          </Layout>
        {/* </PlayingContext.Provider> */}
      </AuthContextProvider>
    </Router>
  )
}

export default App;